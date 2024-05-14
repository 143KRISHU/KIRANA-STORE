import React, { useEffect, useState } from 'react'
import backendRoutesAPI from "../../BackendAPI/API.js"
import { toast } from "react-toastify"
import ProductCard from '../../Components/ProductCard/ProductCard.jsx'
function ViewAllListedProducts() {
  const [products, setProducts] = useState([])
  const getAllProductData = async () => {
    const data = await fetch(backendRoutesAPI.admin.showProduct.url, {
      method: backendRoutesAPI.admin.showProduct.method
    })
    const products = await data.json()
    console.log(products)
    if (products.success) {
      setProducts(products.data)
    }
    else {
      toast.error(products.message)
    }
  }

  useEffect(() => {
    getAllProductData()
  }, [])
  return (
    <div className='product-conatiner p-10 border shadow-2xl flex justify-evenly items-center align-middle   gap-10 flex-wrap' 
    style={{ backgroundColor: "#EDF6F9" }}>
      {
        products.map((product, index) => {
          return <ProductCard product={product} index={index} key={index} />
        })
      }
    </div>
  )
}

export default ViewAllListedProducts
