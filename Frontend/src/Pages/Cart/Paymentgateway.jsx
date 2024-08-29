import React from 'react'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSteeperProgress } from '../../Store/steeperStepSlice'

function Paymentgateway() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
 

  return (
    <div>
      <button className='bg-green-400  px-4 py-2'
        onClick={() => {
          dispatch(setSteeperProgress(1))
          navigate('/yourcart/checkout')
        }}
      >Back</button>
      <button className='bg-red-400  px-4 py-2'
        onClick={() => {
          dispatch(setSteeperProgress(3))
          navigate('/yourcart/orderStatus')
        }}
      >Next</button>
    </div>
  )
}

export default Paymentgateway
