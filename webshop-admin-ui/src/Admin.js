import React from 'react';
import './Admin.css';
import {
  BrowserRouter,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import Dashboard from './components/dashboard';
import Products from './components/products';
import UploadProductForm from './components/UploadProductForm';
import UpdateProduct from './components/UpdateProduct'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
import Orders from './components/Orders/Orders'

export default class Admin extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div id="mainnav" className="d-flex align-items-center justify-content-center">
          <Nav>
            <Nav.Item>
              <NavLink exact to="/" style={{ margin: "10px" }} activeStyle={{ fontWeight: "bold" }}>Dashboard</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/products" style={{ margin: "10px" }} activeStyle={{ fontWeight: "bold" }}>Products</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/upload-product" style={{ margin: "10px" }} activeStyle={{ fontWeight: "bold" }}>Upload Products</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/orders" style={{ margin: "10px" }} activeStyle={{ fontWeight: "bold" }}>Orders</NavLink>
            </Nav.Item>
          </Nav>
          </div>

          <div>
          <Switch>
            <Route path="/products">
              <Products />
            </Route>
            <Route path="/upload-product" component={UploadProductForm} />
            <Route path="/product/:sku" component={UpdateProduct} />
            <Route path="/orders" component={Orders} />
            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
