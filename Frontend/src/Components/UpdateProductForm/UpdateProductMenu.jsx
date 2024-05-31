import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function UpdateProductMenu() {
      const product = useSelector((state) => state?.product?.product)
      const customer = useSelector((state) => state?.customer?.customer)
      console.log(product)
      const [productData, setProductData] = useState(product)
      console.log(productData)
      return (
            productData && customer.role.toLowerCase() ==="admin"?
            (<div className='max-w-[50%] mx-auto ' >
                  <div className= ' mx-auto' style={{ backgroundColor: "#006D7740" }}>
                        {/*  Heading */}
                        <div className=" text-2xl text-center font-bold">
                              Add New Product To List
                              <Link>Back To All Product Page</Link>
                        </div>
                        {/* Form Section */}
                        <form className='flex justify-evenly items-center p-2 mt-2 gap-2'>
                              {/* Product Name */}

                              <label htmlFor='productName' className='text-xl font-semibold'>Name of Product :</label>
                              <input
                                    type='text'
                                    id='productName'
                                    className='border bg-white px-2 py-2 rounded-sm w-full max-w-[60%]'
                                    value={productData.productName}
                                    placeholder='Enter the name of the Product' />
                              <p className='text-red-500'></p>
                        </form>
                  </div>
            </div>) : <h1>Product Not Found</h1>
      )
}

export default UpdateProductMenu
