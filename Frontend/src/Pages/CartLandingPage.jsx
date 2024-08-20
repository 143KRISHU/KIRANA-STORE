import React from 'react'
import { Outlet } from 'react-router-dom'
import Steeper from '../Components/Steeper/Steeper'

function CartLandingPage() {
  return (
    <div className='container'>
      <Steeper/>
      <Outlet/>
    </div>
  )
}

export default CartLandingPage
