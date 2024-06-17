import React, { useEffect } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import "./AdminPannel.css"
function AdminPanel() {
  const navigate = useNavigate()
  const admin = useSelector((state) => state?.customer?.customer)
  return (
    <div className='min-h-[calc(100vh-148px)] flex mb-10'>
      <aside className=' min-h-full w-full max-w-72 p-4'>
        <div className="top flex items-center gap-6 mt-4 p-2  rounded-md shadow-sm bg-white">
          <FaUserCircle className='text-4xl' style={{ color: "#E29578" }} />
          <div className="greeting">
            <p className='text-base' style={{ margin: "0px" }}>Hello,</p>
            <h3 className='capitalize text-xl font-semibold' style={{ margin: "0px" }}>{admin?.fullname}</h3>
            <div className="role flex items-end justify-end">
              <h6 className='text-sm capitalize item-end'>({admin?.role.toLowerCase()})</h6>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-evenly mt-4 rounded-md shadow-sm bg-white py-2 px-2 ">
          <div className="header-info w-full flex items-center gap-4">
            <LuListTodo className='header-info-logo  text-2xl ml-2 mr-3' />
            <p className='capitalize text-lg font-bold'>Admin task</p>
          </div>
          <hr></hr>
          <div className="admin-links mt-2">
            <nav className='grid text-md '>
              <div className="admin-action w-full  py-2 cursor-pointer" onClick={()=>navigate("/admin-pannel/view-all-customer")}>
                <Link to={"/admin-pannel/view-all-customer"} className=' ml-16 '>View All Customers</Link>
              </div>
              <div className="admin-action w-full  py-2 cursor-pointer" onClick={()=>navigate("/admin-pannel/view-all-listed-products")}>
                <Link to={"/admin-pannel/view-all-listed-products"} className=' ml-16 '>View All Products</Link>
              </div>
              <div className="admin-action w-full  py-2 cursor-pointer" onClick={()=>navigate("/admin-pannel/add-products")}>
                <Link to={"/admin-pannel/add-products"} className=' ml-16 '>Add Product</Link>
              </div>

            </nav>
          </div>
        </div>
      </aside>
      <main className='mt-12 rounded-md h-fit w-full ml-1'>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminPanel
