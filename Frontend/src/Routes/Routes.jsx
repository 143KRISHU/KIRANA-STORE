import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "../App.jsx"
import EmailVerify from '../Pages/EmailVerify.jsx';
import ForgotPassword from '../Pages/ForgotPassword.jsx';
import Home from '../Pages/Home.jsx';
import Login from '../Pages/Login.jsx';
import SignUp from '../Pages/SignUp.jsx';
import AdminPanel from '../Pages/Admin/AdminPanel.jsx';
import CustomerProfile from '../Pages/CustomerProfile.jsx';
import ViewAllCustomer from "../Pages/AdminOptionPages/ViewAllCustomer.jsx"
import AddProducts from "../Pages/AdminOptionPages/AddProducts.jsx"
import ViewAllListedProducts from "../Pages/AdminOptionPages/ViewAllListedProducts.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path='/customer/:id/verify/:token' element={<EmailVerify />} />
      <Route path="/customer-profile" element={<CustomerProfile />} />
      <Route Route path="/admin-pannel" element={<AdminPanel />}>
        <Route path="/admin-pannel/view-all-customer" element={<ViewAllCustomer />} />
        <Route path="/admin-pannel/add-products" element={<AddProducts />} />
        <Route path="/admin-pannel/view-all-listed-products" element={<ViewAllListedProducts />} />
      </Route>
      {/* ... etc. */}
    </Route>
  )
);
export default router
