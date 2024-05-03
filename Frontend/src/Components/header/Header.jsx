import React, { useState, useContext } from 'react'
import Search from '../Search/Search'
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart2 } from "react-icons/bs";
import "./header.css"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import backendRoutesAPI from "../../BackendAPI/API.js"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { setCustomerDetail } from "../../Store/customerSlice.js";

function Header() {

  const customer = useSelector((state) => state?.customer?.customer)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    const backendApiResponse = await fetch(backendRoutesAPI.signout.url, {
      method: backendRoutesAPI.signout.method,
      credentials: "include"
    })
    const finalResponse = await backendApiResponse.json()
    if (finalResponse.success) {
      toast.success(finalResponse.message)
      dispatch(setCustomerDetail(null))
    }
  }
  return (
    <header className='header h-16 w-screen'>
      <div className="h-full w-full flex flex-row justify-between items-center header-box">
        <div className="logo ml-10 py-2 px-2">
          <Link to={'/'}>
            <i className="fa-brands fa-shopware"></i>
          </Link>
          <h4>KIRANA-STORE</h4>
        </div>
        <Search />
        <div className='links flex flex-row justify-around gap-10 items-center'>
          <div className={customer?._id ? "user-icon text-2xl gap-2 flex justify-center items-center cursor-pointe"
            : "user-icon text-3xl  cursor-pointer"}>
            <FaRegCircleUser />
            <p>
              {
                customer ? (customer.fullname.split(" ", 1))[0].toUpperCase() : ""
              }
            </p>
          </div>
          <div className="cart-icon text-3xl  cursor-pointer relative">
            <span><BsCart2 /></span>
            <p className='text-xs bg-red-500 w-5 h-5 text-white absolute -top-1.5 -right-2 cart-value
            flex items-center justify-center rounded-full'>0</p>
          </div>
          <div className="mr-5">
            {
              customer?._id
                ? <button className='mr-5 login-btn' onClick={handleLogout}>
                  Logout
                </button>
                : <button className='mr-5 login-btn'>
                  <Link to={"/login"}>Login</Link>
                </button>
            }
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header