import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { TbLogout } from "react-icons/tb";
import UserInfoPage from './UserInfoPage';
import backendRoutesAPI from '../BackendAPI/API';
import { toast } from 'react-toastify';
import { setCustomerDetail } from '../Store/customerSlice';
import { resetProductDetail } from '../Store/cartSlice';
import { useNavigate } from 'react-router-dom';

function CustomerProfile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const customer = useSelector((state) => state?.customer?.customer)
  const fullName = `${customer?.firstName !== undefined ? customer?.firstName : 'User'} 
                    ${customer?.middleName !== undefined ? customer?.middleName : ''} 
                    ${customer?.lastName !== undefined ? customer?.lastName : ''}`
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
    <div className='min-h-[calc(100vh-148px)] flex'>
      <aside className=' min-h-full w-full max-w-72 p-4' style={{ backgroundColor: "#EDF6F9" }}>
        <div className="top flex items-center gap-6 mt-4 p-2  rounded-md shadow-md bg-[#fff]">
          <FaUserCircle className='text-4xl' style={{ color: "#E29578" }} />
          <div className="greeting">
            <p className='text-base' style={{ margin: "0px" }}>Hello,</p>
            <h3 className='capitalize text-xl font-semibold' style={{ margin: "0px" }}>{fullName}</h3>
            <div className="role flex items-end justify-end">
              <h6 className='text-sm capitalize item-end'>({customer?.role.toLowerCase()})</h6>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-evenly mt-4 rounded-md shadow-sm bg-white py-2 px-2 group cursor-pointer" onClick={handleLogout}>
          <div className="header-info w-full flex items-center gap-4">
            <TbLogout className='header-info-logo  text-2xl ml-2 mr-3' />
            <p className='capitalize text-lg font-bold'>Logout</p>
          </div>
        </div>
      </aside>
      <div className="mt-7 rounded-md h-fit w-full ml-1">
        <UserInfoPage/>
      </div>
    </div>
  )
}

export default CustomerProfile
