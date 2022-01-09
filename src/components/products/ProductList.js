import React, { Component } from "react";
import { connect } from "react-redux";
import { Badge, Button } from "reactstrap";
import { bindActionCreators } from "redux";
import * as productActions from "../../redux/actions/productActions";
import * as cartActions from "../../redux/actions/cartActions";
import {  CardBody,
  CardGroup,
  CardText,
  Card,
  CardTitle,
  CardImg, } from "reactstrap";
import alertify from "alertifyjs"
import {Link} from "react-router-dom"

class ProductList extends Component {
  componentDidMount() {
    this.props.actions.getProducts();
  }
  addToCart = (product)=>{
    this.props.actions.addToCart({quantity:1,product})
    alertify.success(product.productName + " sepete eklendi")
  }
  render() {
    return (
      <div>
        <h3>
          <Badge dark="dark">Products</Badge>
          <Badge color="success">
            {this.props.currentCategory.categoryName}
          </Badge>
        </h3>
      {/* <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Quantity Per Unit</th>
              <th>Units In Stock</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.products.map(product => (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td><Link to={"/saveproduct/"+product.id}>{product.productName}</Link></td>
                <td>{product.unitPrice}</td>
                <td>@{product.quantityPerUnit}</td>
                <td>{product.unitsInStock}</td>
                <td>
                  <Button color="success" onClick={()=>this.addToCart(product)}>
                    ekle
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
            </Table> 
            */ } 

<CardGroup>
          {this.props.products.map(product => (
            <tr key={product.id}>
              <Card body>
                <CardImg
                  alt="Card image"
                  src="https://picsum.photos/318/180"
                  top
                  width="50%"
                />
                <CardBody align="center">
                  <CardTitle tag="h5">
                    <Link to={"/saveproduct/"+product.id}>Ürün ismi {product.id}</Link>
                  </CardTitle>
                  <CardText>Ürün Açıklaması.</CardText>
                  <Button
                    onClick={() => this.addToCart(product)}
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

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    products: state.productListReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
      addToCart: bindActionCreators(cartActions.addToCart, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);
