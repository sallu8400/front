import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./component/Admin/Layout";

import "remixicon/fonts/remixicon.css";
import NotFound from "./component/NotFound";
import AdminProduct from "./component/Admin/Product";
import Orders from "./component/Admin/Orders";
import Dashboard from "./component/Admin/Dashboard";
import Payments from "./component/Admin/Payments";
import Customers from "./component/Admin/Customers";
import Setings from "./component/Admin/Setings";
import Auth from "./component/Admin/Auth";
import PREE from "./component/Admin/PREE";
import Home from "./component/Home";

import Category from "./component/Category";
import Signup from "./component/Signup";
import Login from "./component/Login";
import Contact from "./component/Contact";
import Gaurd from "./component/Gaurd/Gaurd";
import Cart from "./component/Cart";
import Profile from "./component/Profile";
import Failed from "./component/Failed";
import Admin from "./component/Gaurd/Admin";
import Products from "./component/Products";
const App = () => {
  return (
    // <PREE />

    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home slider={true} title="Latest Product" />}
        />
        <Route path="/products" element={<Products slider={false} />} />
        <Route path="/category" element={<Category />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route element={<Gaurd />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/failed" element={<Failed />} />
        <Route element={<Admin />}>
          <Route path="/admin">
            <Route path="products" element={<AdminProduct />} />
            <Route path="orders" element={<Orders />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="payments" element={<Payments />} />
            <Route path="customers" element={<Customers />} />
            <Route path="settings" element={<Setings />} />
            <Route path="auth" element={<Auth />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
