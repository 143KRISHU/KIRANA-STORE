import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSteeperProgress } from '../Store/steeperStepSlice'

function ChecckOutpage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let cartData = useSelector((state) => state?.addTocart)
  let allProduct = cartData?.items
  const [totalCartPrice, setTotalCartPrice] = useState(0)
  const [totalCostPrice, setTotalCostPrice] = useState(0)
  const formattedCurrency = (number) => {
    return (
      number.toLocaleString('en-US', {
        style: 'currency',
        currency: 'INR', // Change to your desired currency code
      }))
  }
  return (
    <div className='flex px-32 py-5 rounded-lg'>
      <div className='flex justify-between items-center w-full'>
        <button className='bg-green-400  px-4 py-2'
          onClick={() => {
            dispatch(setSteeperProgress(0))
            navigate('/yourcart')
          }}
        >Back</button>
        <button className='bg-green-400  px-4 py-2'
          onClick={() => {
            dispatch(setSteeperProgress(2))
            navigate('/yourcart/payment')
          }}
        >Next</button>
      </div>
    </div>
  )
}

export default ChecckOutpage
