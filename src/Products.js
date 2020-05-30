import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import axios from 'axios';

export default class Products extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: []
    }

    this.addToCart = this.addToCart.bind(this)
  }
  // state = {
  //   products: []
  // }

  componentDidMount() {
    axios.get('https://api4286.s3.ap-south-1.amazonaws.com/products.json').then(res => {
      console.log(res.data)
      const products = res.data
      this.setState({ products })
    })
  }

  addToCart(product, e) {
    product.qty = 1
    let cart = window.sessionStorage.getItem('cart')
    console.log('start', cart)
    if (!cart) {
      cart = [product]
    } else {
      let parsedCart = JSON.parse(cart)
      let isUpdate = false
      parsedCart.map((x, i) => {
        if (parsedCart[i].title == product.title) {
          isUpdate = true
          parsedCart[i].qty++
        }
      })
      if (!isUpdate) {
        parsedCart.push(product)
      }
      cart = parsedCart
    }
    window.sessionStorage.setItem('cart', JSON.stringify(cart))
    console.log('end',window.sessionStorage.getItem('cart'))
  }

  render() {
    return (
      <Container fluid>
        {/* <Button onClick={window.sessionStorage.clear()}>Clear Cart</Button> */}
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Image</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Unit Price</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map((product, i) =>
              <tr key={i}>
                <td>{i + 1}</td>
                <td><Image src={product.filename} rounded height="100" width="100" style={{ objectFit: 'cover' }} /></td>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.rating}</td>
                <td>
                  <Button variant="primary" onClick={e => this.addToCart(product, e)}>
                    Add to cart</Button>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    )
  }
}
