import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import { unstable_batchedUpdates } from 'react-dom';
// import Header from './Header'

export default class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cart: [],
      total: 0
    }
    this.updateQty = this.updateQty.bind(this)
  }

  componentDidMount() {
    let cart = JSON.parse(window.sessionStorage.getItem('cart'))
    let total = 0;
    cart.map((x, i) => {
      total += (cart[i].price * cart[i].qty)
    })
    total = Math.round((total + Number.EPSILON) * 100) / 100
    this.setState({ cart, total })
  }

  updateQty(product, type) {
    let parsedCart = this.state.cart
    let total = this.state.total
    parsedCart.map((x, i) => {
      if (parsedCart[i].title == product.title) {
        if (type == '+') {
          parsedCart[i].qty++
          total += parsedCart[i].price
        } else {
          parsedCart[i].qty--
          total -= parsedCart[i].price
          if (parsedCart[i].qty == 0) {
            parsedCart.splice(i, 1)
          }
        }
      }
    })
    total = Math.round((total + Number.EPSILON) * 100) / 100
    this.setState({ cart: parsedCart })
    this.setState({ total })
    window.sessionStorage.setItem('cart', JSON.stringify(parsedCart))
  }

  render() {
    return (
      <Container fluid>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Unit Price</th>
              <th>Rating</th>
              <th>Qty</th>
            </tr>
          </thead>
          <tbody>

            {this.state.cart.map((product, i) =>
              <tr key={i}>
                <td>{i + 1}</td>
                <td><Image src={product.filename} rounded height="100" width="100" style={{ objectFit: 'cover' }} /></td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.rating}</td>
                <td>
                  <Button variant="success" size="sm" onClick={e => this.updateQty(product, '+')}>+ Add</Button>{' '}{product.qty}{' '}<Button variant="danger" onClick={e => this.updateQty(product, '-')} size="sm">- Remove</Button>
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <th>Total:</th><td>{this.state.total}</td>
          </tfoot>
        </Table>
      </Container>
    )
  }
}
