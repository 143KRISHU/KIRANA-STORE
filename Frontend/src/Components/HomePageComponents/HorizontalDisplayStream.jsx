import React, { useEffect, useState } from 'react'
import { IoChevronForwardCircle } from "react-icons/io5";
import backendRoutesAPI from '../../BackendAPI/API';

function HorizontalDisplayStream({ subcategory, heading }) {
      const [subCategoryWiseProduct, setSubCategoryWiseProduct] = useState([])
      const [isLoading, setIsLoading] = useState(false)
      const loadingScreen = new Array(8).fill(null)
      const [isError, setIsError] = useState(false)

      const getProductData = async () => {
            setIsLoading(true)
            const backendResponse = await fetch(backendRoutesAPI.homePageAPI.subCategoryWiseProduct.url, {
                  method: backendRoutesAPI.homePageAPI.subCategoryWiseProduct.method,
                  headers: {
                        'content-type': "application/json"
                  },
                  body: JSON.stringify({ subcategory: subcategory })
            })
            const finalRes = await backendResponse.json()
            if (finalRes.success) {
                  setSubCategoryWiseProduct(finalRes.data)
                  setIsError(false)
                  setIsLoading(false)
            }
            else {
                  setIsError(true)
                  setIsLoading(false)
            }
      }
      const formattedCurrency = (number) => {
            return (
                  number.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'INR', // Change to your desired currency code
                  }))
      }
      useEffect(() => {
            getProductData()
      }, [])

      return (
            <div className='bg-white shadow mt-6'>
                  <div className='px-4 py-4'>
                        <div className='mb-3 flex justify-between items-center'>
                              <div className='text-2xl font-semibold'>{heading}</div>
                              <div className='text-3xl text-[#006D77] h-fit w-fit cursor-pointer hover:scale-125 transition-all'><IoChevronForwardCircle /></div>
                        </div>
                        <div className='flex sm:flex-col md:flex-row bg-white gap-4'>
                              {
                                    isLoading ? (
                                          loadingScreen.map((_, index) => {
                                                <>
                                                      <div className='flex md:flex-col sm:flex-row justify-center items-center border p-[6px] rounded-md' key={index}>
                                                            <div id='productImage' className='w-full md:h-[220px] md:max-w-[200px] sm:h-[64px] sm:max-w-[64px] cursor-pointer'>
                                                            </div>
                                                            <div id='productDetail' className='flex flex-col justify-center items-center'>
                                                                  <div className='md:text-lg sm:text-base capitalize'></div>
                                                                  <div className='md:text-lg sm:text-base font-bold'></div>
                                                            </div>
                                                      </div>
                                                </>
                                          })
                                    ) : (
                                          subCategoryWiseProduct.map((product, index) => {
                                                return (
                                                      <>
                                                            <div className='flex md:flex-col sm:flex-row  border p-[6px] rounded-md' key={index}>
                                                                  <div id='productImage' className='w-full md:h-[220px] md:max-w-[200px] sm:h-[64px] sm:max-w-[64px] cursor-pointer'>
                                                                        <img src={product.productImage[0]} className='h-full w-full object-scale-down hover:scale-105 transition-all' />
                                                                  </div>
                                                                  <div id='productDetail' className='flex flex-col justify-center items-center'>
                                                                        <div className='md:text-lg sm:text-base text-center max-w-48 text-clip line-clamp-1  capitalize'>{product.productName}</div>
                                                                        <div className='md:text-lg sm:text-base font-semibold'>Just {formattedCurrency(product.productSellingPrice)} </div>
                                                                  </div>
                                                            </div>
                                                      </>
                                                )
                                          })
                                    )
                              }
                        </div>
                  </div>
            </div>
      )
}

export default HorizontalDisplayStream
