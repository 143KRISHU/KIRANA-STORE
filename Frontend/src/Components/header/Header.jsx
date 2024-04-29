import React, { useState } from 'react'
import Search from '../Search/Search'
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart2 } from "react-icons/bs";
import "./header.css"
import { Link } from 'react-router-dom';
function Header() {
  return (
    <header className='header h-16 w-screen'>
      <div className="h-full w-full flex flex-row justify-between items-center header-box">
        <div className="logo ml-10">
          <Link to={'/'}>
          <i className="fa-brands fa-shopware"></i>
          </Link>
          <h4>KIRANA-STORE</h4>
        </div>
        <Search />
        <div className='links flex flex-row justify-around gap-10 items-center'>
          <div className="user-icon text-3xl  cursor-pointer">
            <FaRegCircleUser/>
            </div>
          <div className="cart-icon text-3xl  cursor-pointer relative">
            <span><BsCart2 /></span>
            <p className='text-xs bg-red-500 w-5 h-5 text-white absolute -top-1.5 -right-2 cart-value
            flex items-center justify-center rounded-full'>0</p>
          </div>
          <button className='mr-5 login-btn'>
            <Link to={"/login"}>Login</Link>
            </button>
        </div>
      </div>
    </header>
  )
}

export default Header