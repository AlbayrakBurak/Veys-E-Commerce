import React, { Component } from "react";
import CategoryList from "./CategoryList";
import Navi from "./Navi";
import ProductList from "./ProductList";
import { Col, Container, Row } from "reactstrap";
import alertify from "alertifyjs";
import { Route, Switch } from "react-router-dom";

import NotFound from "./NotFound";
import CartList from "./CartList";
import FormDemo1 from "./FormDemo1";
import FormDemo2 from "./FormDemo2";

export default class App extends Component {
  state = { currentCategory: "", products: [], cart: [] };

  componentDidMount() {
    this.getProducts();
  }

  changeCategory = (category) => {
    //x+y=z mantığı ile aynı değeri değiştirmek için fonksiyon tanımladık
    this.setState({ currentCategory: category.categoryName });
    console.log(category);
    this.getProducts(category.id);
  };

  //json-server --watch db.json
  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url) //db.json dosyasını tanımlıyoruz (fetch js kütüphanesi)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };

  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find((c) => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }
    this.setState({ cart: newCart });
    alertify.success(product.productName + " added to cart!", 2);
  };

  removeFromCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id); //arraydaki elemanları şarta göre filtreliyor
    this.setState({ cart: newCart });
    alertify.error(product.productName + " removed from cart!", 2);
  };

  render() {
    let productInfo = { title: "Product List" };
    let categoryInfo = { title: "Category List" };

    return (
      <div>
        <Container>
          <Navi removeFromCart={this.removeFromCart} cart={this.state.cart} />

          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props=> (
                    <ProductList
                    {...props}
                      products={this.state.products}
                      addToCart={this.addToCart}
                      currentCategory={this.state.currentCategory}
                      info={productInfo}
                    />
                  )}
                />
                <Route exact path="/cart"   render={props=> (
                    <CartList
                    {...props}
                      cart={this.state.cart}
                      removeFromCart={this.removeFromCart}
                    />
                  )} />
                  <Route path="/form1" component={FormDemo1}></Route>
                  <Route path="/form2" component={FormDemo2}></Route>
                <Route component={NotFound }></Route>
              </Switch>
              
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
