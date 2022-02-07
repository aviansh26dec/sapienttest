import React, { Component } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

import ProductList from './component/ProductList';
import Cart from './component/Cart';
import './assets/css/styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: []
    }
  }

  componentDidMount(){
    axios.get(`http://dnc0cmt2n557n.cloudfront.net/products.json`)
      .then(res => {
        let itemList = JSON.parse(localStorage.getItem('itemList'));
        let list = res.data.products;
        list.map((data, index) => {
          list[index].total = (itemList && itemList[index] && itemList[index].total) ? itemList[index].total : 0
        })
        this.setState({ product: list });
    });
  }

  updateCart = (method, index) => {
    let productList = this.state.product;
    productList.map((data, kIndex) => {
      if(method === 'remove'){
        if(kIndex === index && productList[index].total > 0){
          productList[index].total = productList[index].total - 1;
        }
      }else{
        if(kIndex === index){
          productList[index].total = productList[index].total + 1;
        }
      }
    });
    localStorage.setItem('itemList', JSON.stringify(productList))
    this.setState({ product: productList });
  }

  render() {
    return (
      <>
        <Container fluid>
          <Cart update={this.updateCart} products={this.state.product} />
          <ProductList update={this.updateCart} products={this.state.product} />
        </Container>
      </>
    )
  }
}

export default App;
