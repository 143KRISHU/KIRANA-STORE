import React, { useEffect, useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import "./AdminPannel.css"
import UserInfoPage from '../UserInfoPage';
import { TbLogout } from "react-icons/tb";
import backendRoutesAPI from '../../BackendAPI/API';
import { setCustomerDetail } from '../../Store/customerSlice';
import { toast } from 'react-toastify';
import { resetProductDetail } from '../../Store/cartSlice';


function AdminPanel() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [optionEnabled, setOptonEnabled] = useState(false)
  const admin = useSelector((state) => state?.customer?.customer)
  const fullName = `${admin?.firstName !== undefined ? admin?.firstName : 'User'} 
                    ${admin?.middleName !== undefined ? admin?.middleName : ''} 
                    ${admin?.lastName !== undefined ? admin?.lastName : ''}`
  const handleLogout = async () => {
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
  return (
    <div className='min-h-[calc(100vh-148px)] flex mb-10'>
      <aside className=' min-h-full w-full max-w-72 p-4'>
        <div className="top flex items-center gap-6 mt-4 p-2  rounded-md shadow-sm bg-white cursor-pointer group" onClick={() => setOptonEnabled(false)}>
          <FaUserCircle className='text-4xl' style={{ color: "#E29578" }} />
          <div className="greeting">
            <p className='text-base' style={{ margin: "0px" }}>Hello,</p>
            <h3 className='capitalize text-xl font-semibold' style={{ margin: "0px" }}>{fullName}</h3>
            <div className="role flex items-end justify-end">
              <h6 className='text-sm capitalize item-end'>({admin?.role.toLowerCase()})</h6>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-evenly mt-4 rounded-md shadow-sm bg-white py-2 px-2">
          <div className="header-info w-full flex items-center gap-4">
            <LuListTodo className='header-info-logo  text-2xl ml-2 mr-3' />
            <p className='capitalize text-lg font-bold'>Admin task</p>
          </div>
          <div className="admin-links mt-2">
            <nav className='grid text-md '>
              <div className="admin-action w-full  py-2 cursor-pointer"
                onClick={() => {
                  setOptonEnabled(true)
                  navigate("/admin-pannel/view-all-customer")
                }}>
                <Link to={"/admin-pannel/view-all-customer"} className=' ml-16 '>View All Customers</Link>
              </div>
              <div className="admin-action w-full  py-2 cursor-pointer"
                onClick={() => {
                  setOptonEnabled(true)
                  navigate("/admin-pannel/view-all-listed-products")
                }}>
                <Link to={"/admin-pannel/view-all-listed-products"} className=' ml-16 '>View All Products</Link>
              </div>
              <div className="admin-action w-full  py-2 cursor-pointer"
                onClick={() => {
                  setOptonEnabled(true)
                  navigate("/admin-pannel/add-products")
                }}>
                <Link to={"/admin-pannel/add-products"} className=' ml-16 '>Add Product</Link>
              </div>
            </nav>
          </div>
        </div>
        <div className="flex flex-col justify-evenly mt-4 rounded-md shadow-sm bg-white py-2 px-2 group cursor-pointer" onClick={handleLogout}>
          <div className="header-info w-full flex items-center gap-4">
            <TbLogout className='header-info-logo  text-2xl ml-2 mr-3' />
            <p className='capitalize text-lg font-bold'>Logout</p>
          </div>
        </div>
      </aside>
      <main className='mt-7 rounded-md h-fit w-full ml-1'>
        {
          optionEnabled ? <Outlet /> : <UserInfoPage />
        }
      </main>
    </div>
  )
}

export default AdminPanel
