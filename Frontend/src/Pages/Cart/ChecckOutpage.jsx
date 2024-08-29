import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSteeperProgress } from '../../Store/steeperStepSlice'
import { toast } from 'react-toastify';
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

function ChecckOutpage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let cartData = useSelector((state) => state?.addTocart)
  let allProduct = cartData?.items
  const customer = useSelector((state) => state?.customer?.customer)
  const [totalCartPrice, setTotalCartPrice] = useState(0)
  const [totalCostPrice, setTotalCostPrice] = useState(0)
  const formattedCurrency = (number) => {
    return (
      number.toLocaleString('en-US', {
        style: 'currency',
        currency: 'INR', // Change to your desired currency code
      }))
  }
  useEffect(() => {

    if (allProduct?.length > 0) {
      setTotalCartPrice(allProduct.reduce((acc, item) => acc + item.product.productSellingPrice * item.quantity, 0))
      setTotalCostPrice(allProduct.reduce((acc, item) => acc + item.product.productListingPrice * item.quantity, 0))
    }
    else {
      setTotalCartPrice(0)
      setTotalCostPrice(0)
    }
  }, [allProduct])

  useEffect(()=>{
    if(allProduct.length === 0){
      toast.warning('Add Some Items to Cart')
      navigate('/')
    }
  },[])


  return (
    <>
      <div className='flex flex-col gap-4px-32 py-5 rounded-lg'>
        <div className="mx-auto my-4 w-full md:my-6">
          <div className="overflow-hidden  rounded-xl shadow">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Contact Info */}
              <div className="px-5 py-6 text-gray-900 md:px-8">
                <div className="flow-root">
                  <div className="-my-6 divide-y divide-gray-200">
                    <div className="py-6">
                      <form>
                        <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                          <div>
                            <h3
                              id="contact-info-heading"
                              className="text-lg font-semibold text-gray-900"
                            >
                              Contact information
                            </h3>
                          </div>
                          <hr className="my-8" />
                          <hr className="my-8" />
                          <hr className="my-8" />
                          <div className="mt-10">
                            <h3 className="text-lg font-semibold text-gray-900">Billing information</h3>

                            <div className="mt-6 flex items-center">
                              <input
                                id="same-as-shipping"
                                name="same-as-shipping"
                                type="checkbox"
                                defaultChecked
                                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                              />
                              <div className="ml-2">
                                <label
                                  htmlFor="same-as-shipping"
                                  className="text-sm font-medium text-gray-900"
                                >
                                  Same as shipping information
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="mt-10 flex justify-between items-center border-t border-gray-200 pt-6">
                          <button
                              type="button"
                              onClick={() => {
                                dispatch(setSteeperProgress(0))
                                navigate('/yourcart')
                              }}
                              className="rounded-md bg-[#006D77] px-3 py-2 text-sm font-semibold flex gap-2 items-center justify-center
                              text-[#EDF6F9] shadow-sm hover:bg-[#EDF6F9] hover:text-[#006D77] focus-visible:outline 
                                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006D77]"
                            >
                               <FaArrowLeft/> Go To Cart
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                dispatch(setSteeperProgress(2))
                                navigate('/yourcart/payment')
                              }}
                              className="rounded-md bg-[#006D77] px-3 py-2 text-sm font-semibold flex justify-center items-center gap-2
                                    text-[#EDF6F9] shadow-sm hover:bg-[#EDF6F9] hover:text-[#006D77] focus-visible:outline 
                                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006D77]"
                            >
                              Make payment <FaArrowRight/>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* Product List */}
              <div className="bg-[#b5e7e4b4] px-5 py-6 md:px-8">
                <h1 className='mb-2'><span className='bg-white p-0.5 text-[#006D77] font-semibold'>3</span>Order Summary</h1>
                <div className="flow-root">
                  <ul className="-my-7 divide-y divide-gray-200">
                    {allProduct.map((product) => (
                      <li
                        key={product?.product?._id}
                        className="flex items-stretch justify-between space-x-5 py-7"
                      >
                        <div className="flex flex-1 items-stretch">
                          <div className="flex-shrink-0">
                            <img
                              className="h-24 w-24 rounded-lg border border-gray-200 bg-white object-contain"
                              src={product?.product?.productImage[0]}
                              alt={product?.product?.productName}
                            />
                          </div>
                          <div className="ml-5 flex flex-col justify-between">
                            <div className="flex-1">
                              <p className="text-base capitalize font-bold">{product?.product?.productName}</p>
                            </div>
                            <p className="mt-4 text-xs font-medium ">x {product.quantity}</p>
                          </div>
                        </div>
                        <div className="ml-auto flex flex-col items-end justify-between">
                          <p className="text-base font-medium text-gray-500 line-through">
                            {formattedCurrency(product.product.productListingPrice)}
                          </p>
                          <p className="text-lg font-medium text-[#000]">
                            &nbsp;&nbsp;{formattedCurrency(product.product.productSellingPrice)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <hr className="mt-6 border-black" />
                <ul className="mt-6 space-y-3">
                  <li className="flex items-center justify-between text-black">
                    <p className="text-base font-medium">Total Cost Price</p>
                    <p className="text-lg text-[#000] font-medium">{formattedCurrency(totalCostPrice)}</p>
                  </li>
                  <li className="flex items-center justify-between text-black">
                    <p className="text-base font-medium">Discount Applied</p>
                    <p className="text-base text-red-500 font-medium"> -{formattedCurrency(totalCostPrice - totalCartPrice)}</p>
                  </li>
                  <li><hr className='my-2' /></li>
                  <li className="flex items-center justify-between text-black">
                    <p className="text-base font-medium ">Total</p>
                    <p className="text-lg text-[#000] font-bold ">{formattedCurrency(totalCartPrice)}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChecckOutpage
