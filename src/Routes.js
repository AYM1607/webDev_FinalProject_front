import React from "react";
import { Route, Switch } from "react-router-dom";

import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import AdminRoute from "./components/AdminRoute";

import NotFound from "./screens/NotFound";
import Home from "./screens/Home";
import Payment from "./screens/Payment";
import ThankYou from "./screens/ThankYou";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Products from "./screens/Products";
import Admin from "./screens/Admin";
import NewProduct from "./screens/NewProduct";
import MyOrders from "./screens/MyOrders";
import AboutUs from "./screens/AboutUs";

export default function Routes(props) {
  return (
    <Switch>
      <AppliedRoute appProps={props} component={Login} path="/login" exact />
      <AppliedRoute appProps={props} component={Signup} path="/signup" exact />
      <AppliedRoute
        appProps={props}
        component={AboutUs}
        path="/nosotros"
        exact
      />
      <AppliedRoute appProps={props} component={Home} path="/" exact />
      <AppliedRoute
        appProps={props}
        component={Products}
        path="/productos"
        exact
      />
      <AuthenticatedRoute
        appProps={props}
        component={Payment}
        path="/pagar"
        exact
      />
      <AuthenticatedRoute
        appProps={props}
        component={MyOrders}
        path="/ordenes"
        exact
      />
      <AppliedRoute
        appProps={props}
        component={ThankYou}
        path="/gracias"
        exact
      />
      <AdminRoute appProps={props} component={Admin} path="/admin" exact />
      <AdminRoute
        appProps={props}
        component={NewProduct}
        path="/new-product"
        exact
      />
      <Route component={NotFound} />
    </Switch>
  );
}
