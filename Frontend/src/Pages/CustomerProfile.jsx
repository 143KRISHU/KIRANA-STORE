import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';

function CustomerProfile() {
  const customer = useSelector((state) => state?.customer?.customer)
  return (
    <div className='min-h-[calc(100vh-148px)] flex'>
    <aside className=' min-h-full w-full max-w-72 p-4' style={{ backgroundColor: "#EDF6F9" }}>
      <div className="top flex items-center gap-6 mt-4 p-2  rounded-md shadow-md">
        <FaUserCircle className='text-4xl' style={{ color: "#E29578" }} />
        <div className="greeting">
          <p className='text-base' style={{ margin: "0px" }}>Hello,</p>
          <h3 className='capitalize text-xl font-semibold' style={{ margin: "0px" }}>{customer?.fullname}</h3>
          <div className="role flex items-end justify-end">
            <h6 className='text-sm capitalize item-end'>({customer?.role.toLowerCase()})</h6>
          </div>
        </div>
      </div>
    </aside>
    <div className="mian">
      main
    </div>
  </div>
  )
}

export default CustomerProfile
