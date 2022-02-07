import React from 'react';


import { Container, Table, InputGroup, FormControl } from 'react-bootstrap';

function App( {update, products} ) {
  return (
    <>
     <Container>
        <Table  bordered  className="mt-3">
            <thead>
                <tr>
                <th>#</th>
                <th>Title</th>
                <th>Qty.</th>
                <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {products.length > 0 &&
                    products.map((item, index) => 
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td data-testid="list-item">{item.title}<hr/>{item.desc}</td>
                            <td>
                                <InputGroup>
                                    <InputGroup.Text className="cursor btn-danger" onClick={() => update('remove', index)}>-</InputGroup.Text>
                                        <FormControl value={(item.total === 0) ? 1 : item.total} readOnly />
                                    <InputGroup.Text className="cursor btn-success" onClick={() => update('add', index)}>+</InputGroup.Text>
                                </InputGroup>
                            </td>
                            <td>{item.currency}{item.price}</td>
                        </tr>
                    )
                }
            </tbody>
        </Table>
     </Container>
    </>
  );
}

export default App;