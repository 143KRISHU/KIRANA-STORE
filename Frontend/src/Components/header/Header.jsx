import React, { useState, useContext, useEffect } from 'react'
import Search from '../Search/Search'
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart2 } from "react-icons/bs";
import "./header.css"
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import backendRoutesAPI from "../../BackendAPI/API.js"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { setCustomerDetail } from "../../Store/customerSlice.js";
import { FaAngleUp } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { resetProductDetail } from '../../Store/cartSlice';

function Header() {

  const customer = useSelector((state) => state?.customer?.customer)
  const addToCart = useSelector((state) => state.addTocart)
  const [showCustomerOption, setShowCustomerOption] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    setShowCustomerOption(false)
    const backendApiResponse = await fetch(backendRoutesAPI.signout.url, {
      method: backendRoutesAPI.signout.method,
      credentials: "include"
    })
    const finalResponse = await backendApiResponse.json()
    if (finalResponse.success) {
      toast.success(finalResponse.message)
      dispatch(setCustomerDetail(null))
      dispatch(resetProductDetail())
      navigate("/");
    }
  }
  const handleCartClick = () => {
    navigate('/yourcart')
  }


  return (
    <section className='header h-16 w-screen'>
      <div className=" container h-full w-full flex flex-row justify-between items-center header-box">
        {/* left most Company logo */}
        <div className="logo ml-10 py-2 px-2">
          <Link to={'/'}>
            <i className="fa-brands fa-shopware" onClick={() => setShowCustomerOption(false)}></i>
          </Link>
          <h4 className='headingTitle'>KIRANA-STORE</h4>
        </div>


        {/* Search bar */}

        <Search />

        {/* Right Most Part Of the Header */}

        <div className='links flex flex-row justify-around gap-10 items-center'>
          {/* Add To Cart Logo */}
          <div className="cart-icon text-3xl  cursor-pointer relative mr-12 group" onClick={handleCartClick}>
            <span><BsCart2 /></span>
            <p className='text-xs bg-red-500 w-5 h-5 text-white absolute -top-1.5 -right-2 cart-value select-none
            flex items-center justify-center rounded-full'>{addToCart?.totalNumberOfProduct}</p>
          </div>

          {
            customer?._id
              ? (
                <div className="user-icon text-3xl right-5 mr-5 relative gap-2 flex justify-center items-center cursor-pointer"
                >
                  <FaRegCircleUser onMouseOver={() => setShowCustomerOption(true)} />
                  {
                    showCustomerOption && (
                      <div className='user-option absolute text-lg w-fit rounded bg-white bottom-0 h-fit top-11 mx-auto text-black '>
                        <FaAngleUp className='mx-auto' />
                        {
                          customer
                            ?
                            (
                              <nav className='flex flex-col text-xl mt-1 justify-start items-start text-black font-semibold gap-3 '
                                onMouseOver={() => setShowCustomerOption(true)} onMouseOut={() => setShowCustomerOption(false)}>
                                {
                                  customer.role === "ADMIN"
                                    ? (
                                      <Link to={"/admin-pannel"} className='whitespace-nowrap flex items-center gap-6 w-full px-4 py-2 link'
                                        onClick={() => setShowCustomerOption(false)}>
                                        <FaRegUser /> Admin Pannel</Link>
                                    ) :
                                    (
                                      <Link to={"/customer-profile"} className='whitespace-nowrap flex items-center gap-6 w-full px-4 py-2 link'
                                        onClick={() => setShowCustomerOption(false)}>
                                        <FaRegUser /> My Profile</Link>
                                    )
                                }
                                <Link className='whitespace-nowrap flex items-center gap-6 w-full px-4 py-2 link'
                                  onClick={() => setShowCustomerOption(false)}>
                                  <FaClipboardList /> My Orders</Link>

                                <h2 className='flex items-center gap-6 w-full  px-4 py-2  link' onClick={handleLogout}><TbLogout /> Logout</h2>
                              </nav>
                            )
                            : null
                        }
                      </div>
                    )
                  }
                </div>
              )
              : (
                <div className="mr-5">
                  <button className='mr-5 login-btn hover:shadow-lg transition-all'>
                    <Link to={"/login"}>Login</Link>
                  </button>
                </div>
              )
          }
        </div>
      </div>
    </section>
  )
}

export default Header