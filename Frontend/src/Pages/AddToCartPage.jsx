import React from 'react'
import { useSelector } from 'react-redux'

function AddToCartPage() {
      const cartData = useSelector((state)=>state?.addTocart)
      const allProdct = cartData?.productId
      console.log(cartData)
  return (
    <div>
      add to cart
    </div>
  )
}

export default AddToCartPage