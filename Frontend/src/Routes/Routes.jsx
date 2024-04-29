import React from 'react'
import {createBrowserRouter,createRoutesFromElements, Route} from "react-router-dom";
import App from "../App.jsx"
import ForgotPassword from '../Pages/ForgotPassword.jsx';
import Home from '../Pages/Home.jsx';
import Login from '../Pages/Login.jsx';
import SignUp from '../Pages/SignUp.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/forgotPassword" element={<ForgotPassword/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      {/* ... etc. */}
    </Route>
  )
);
export default router
