import React, { Component } from "react";

import {
  /*Table*/ Button,
  CardBody,
  CardGroup,
  CardText,
  Card,
  CardTitle,
  CardImg,
} from "reactstrap";

export default class ProductList extends Component {
  render() {
    return (
      <div>
        {/* <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Unit Name</th>
              <th>Quantity Per Unit</th>
              <th>Units In Stock</th>
              
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product) => (
              <tr key={product.id}>
                <th scope="row">{product.id}</th> //numaralandırma
                <td>{product.productName}</td>
                <td>{product.unitPrice}</td>
                <td>{product.quantityPerUnit}</td>
                <td>{product.unitsInStock}</td>
                <td><Button onClick={()=>this.props.addToCart(product)} color="info">Sepete Ekle</Button></td>
              </tr>
            ))}
          </tbody>
        </Table> */}

        <h2>
          Ürünler{" "}
          {/* {this.props.info.title}*/ <h5>{this.props.currentCategory}</h5>}
        </h2>
        <CardGroup>
          {this.props.products.map((Urun) => (
            <tr key={Urun.id}>
              <Card body>
                <CardImg
                  alt="Card image"
                  src="https://picsum.photos/318/180"
                  top
                  width="50%"
                />
                <CardBody align="center">
                  <CardTitle tag="h5">
                    <td>Ürün İsmi {Urun.id}</td>
                  </CardTitle>
                  <CardText>Ürün Açıklaması.</CardText>
                  <Button
                    onClick={() => this.props.addToCart(Urun)}
                    color="info"
                  >
                    Sepete Ekle
                  </Button>
                </CardBody>
              </Card>
            </tr>
          ))}
        </CardGroup>
      </div>
    );
  }
}
