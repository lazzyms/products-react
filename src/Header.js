import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'

function Header() {
    return (
        <Container>
            <h1 className="text-center">Shop</h1>
            <h2><a href="#">Product List</a>&nbsp;&nbsp;<a href="#">Cart</a></h2>
        </Container>
    )
}

export default Header