import { render, screen, wrapper } from '@testing-library/react';
import ReactDom from 'react-dom';
import renderer from 'react-test-renderer';
import ProductList from '../component/ProductList';

const product = {
    "products": [
      {
        "id": "123442",
        "title": "Product 1",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        "image": "/product1.jpeg",
        "price": "39",
        "currency": "$"
      },
      {
        "id": "123443",
        "title": "Product 2",
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
        "image": "/product2.jpeg",
        "price": "39",
        "currency": "$"
      }
    ]
  };

describe("ProductList", () => {
  it('renders without crashing', () => {
      const div = document.createElement("div");
      ReactDom.render(<ProductList products={product} />, div);
  });

  it('renders correctly', () => {
    const tree = renderer
    .create(<ProductList products={product} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
