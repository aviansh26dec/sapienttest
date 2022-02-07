import React from 'react';
import _ from 'lodash';

import cart from '../assets/images/cart.png';

import { Container, Navbar, Button, Badge, Image, OverlayTrigger, Popover, Table } from 'react-bootstrap';

function Cart({ update, products }) {
  let total = 0;
  let totalAmount = 0;
  let currency = '';

  if(products.length > 0){
    products.map((data) => {
      total += data.total

      if(parseInt(data.total) > 0){
        totalAmount += (parseInt(data.total) * parseInt(data.price));
      }
      currency = data.currency;
    })
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Cart</Popover.Header>
      <Popover.Body>
        <Table  bordered  className="mt-3">
            <thead>
                <tr>
                <th>#</th>
                <th>Title</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {products.length > 0 &&
                    products.map((item, index) => 
                        item.total > 0 ?
                          _.times(item.total, (keyValue) => {
                            return(<tr key={item.id}>
                                <td>{++keyValue}</td>
                                <td>{item.title}</td>
                                <td><Button size="sm" onClick={() => update('remove', index)}>Remove</Button></td>
                            </tr>)
                          })
                        :
                          index === 0 &&
                            <tr key="emptyCart">
                              <td colSpan={3}>Cart is empty.</td>
                            </tr>
                    )
                }
                <tr key="cartTotal">
                  <td colSpan={2}>Total Amount</td>
                  <td>{currency}{totalAmount}</td>
                </tr>
            </tbody>
        </Table>
      </Popover.Body>
      
    </Popover>
  );

  return (
    <>
      <Navbar className="bottomBorder">
        <Container>
          <Navbar.Brand href="#home">Prodct List</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <OverlayTrigger trigger="click" placement="bottom" overlay={popover} rootClose={true}>
                <Button variant="success">
                  <Image src={cart} className="cartLogo" /> <Badge bg="danger">{total}</Badge>
                </Button>
              </OverlayTrigger>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Cart;