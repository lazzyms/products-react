import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Header from './Header'

export default class App extends React.Component {
  state = {
    products: []
  }

  componentDidMount() {
    axios.get('https://api4286.s3.ap-south-1.amazonaws.com/products.json').then(res => {
      console.log(res.data)
      const products = res.data
      this.setState({ products })
    })
  }

  render() {
    return (
      <Container fluid>
        <Header></Header>
        <Table bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Product Image</th>
              <th>Description</th>
              <th>Unit Price</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map((product, i) =>
              <tr>
                <td>{i + 1}</td>
                <td>{product.title}</td>
                <td><img src={product.filename} height={product.height/5} width={product.width/5}></img></td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.rating}</td>
                <td>
                  <Button variant="primary">
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
