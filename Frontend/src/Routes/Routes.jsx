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
import UpdateProductMenu from "../Components/UpdateProductForm/UpdateProductMenu.jsx"
import ErrorPage from '../Pages/ErrorPage.jsx';
import SpecificCategoryPage from '../Components/HomePageComponents/SpecificCategoryPage.jsx';
import SetNewPAssword from '../Pages/SetNewPAssword.jsx';
import ProductDetailPage from '../Pages/ProductDetailPage.jsx';
import AddToCartPage from '../Pages/AddToCartPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'forgotPassword',
        element: <ForgotPassword />,
      },
      {
        path:'resetpassword/:id',
        element:<SetNewPAssword/>
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'customer-profile',
        element: <CustomerProfile />,
      },
      {
        path:'productDetail/:id/view/:name',
        element:<ProductDetailPage/>
      },
      {
        path:'yourcart',
        element:<AddToCartPage/>
      },
      {
        path: 'admin-pannel',
        element: <AdminPanel />,
        children: [
          {
            path: 'view-all-customer',
            element: <ViewAllCustomer />,
          },
          {
            path: 'add-products',
            element: <AddProducts />,
          },
          {
            path: 'view-all-listed-products',
            element: <ViewAllListedProducts />,
          },
        ],
      },
      {
        path: ':id/update-product',
        element: <UpdateProductMenu />,
      },
      {
        path: 'products/:productcategory',
        element:<SpecificCategoryPage/>
      }
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
  {
    path: 'customer/:id/verify/:token',
    element: <EmailVerify />,
  },
]);
export default router
