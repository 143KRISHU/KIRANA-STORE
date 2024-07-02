import React, { useEffect, useState } from 'react'
import { IoChevronForwardCircle } from "react-icons/io5";
import backendRoutesAPI from '../../BackendAPI/API';
import { IoChevronForward } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";

function HorizontalDisplayStream({ subcategory, heading }) {
      const [subCategoryWiseProduct, setSubCategoryWiseProduct] = useState([])
      const [horizontalSlideCount, setHorizontalSlideCount] = useState(0)
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
      const handleForwardMoveButtonInHorizontalSlide = () => {
            console.log(horizontalSlideCount)
            if (horizontalSlideCount !== 3) {
                  setHorizontalSlideCount(horizontalSlideCount + 1)
            }
      }
      const handleBackwardMoveButtonInHorizontalSlide = () => {
            console.log(horizontalSlideCount)
            if (horizontalSlideCount !== 0) {
                  setHorizontalSlideCount(horizontalSlideCount - 1)
            }
      }
      useEffect(() => {
            getProductData()
      }, [])

      return (
            <>
                  {
                        isError ? null :
                              <div className='bg-white shadow mt-6'>
                                    <div className='py-4 relative'>
                                          <div className=' px-4 mb-3 flex justify-between items-center'>
                                                <div className='text-2xl font-semibold title'>{heading}</div>
                                                <div className='text-3xl text-[#006D77] h-fit w-fit cursor-pointer hover:scale-125 transition-all'><IoChevronForwardCircle /></div>
                                          </div>
                                          {
                                                subCategoryWiseProduct.length !== 9 ? null : (
                                                      <div className='z-30 h-fit w-full md:flex justify-between absolute top-[40%]  items-center hidden'>
                                                            <div onClick={handleBackwardMoveButtonInHorizontalSlide}
                                                                  className='text-2xl text-white h-24 w-8 flex justify-center shadow-md cursor-pointer
                                                            items-center edgeRound-left bg-[#006D77]'
                                                                  style={{
                                                                        visibility: `${horizontalSlideCount === 0 ? `hidden` : `visible`}`
                                                                  }}
                                                            ><IoIosArrowBack /></div>
                                                            <div onClick={handleForwardMoveButtonInHorizontalSlide}
                                                                  className='text-2xl text-white h-24 w-8 flex justify-center  shadow-md cursor-pointer
                                                            items-center edgeRound-right bg-[#006D77]'
                                                                  style={{
                                                                        visibility: `${horizontalSlideCount === 3 ? `hidden` : `visible`}`,
                                                                        right: '0'
                                                                  }}
                                                            > <IoChevronForward /></div>
                                                      </div>
                                                )
                                          }
                                          <div className='mainProductDivCinatiner relative flex bg-white gap-4 px-4 py-2 overflow-hidden'>
                                                {
                                                      isLoading ? (
                                                            loadingScreen.map((_, index) => {
                                                                  return (
                                                                        <>
                                                                              <div className='loadingDiv flex h-[300px] w-[200px] bg-slate-400 bg-opacity-35 animate-pulse
                                                                        border-2 p-[6px] rounded-md' key={index}>
                                                                                    <div className='w-full md:h-[220px] md:max-w-[200px] sm:h-[64px] sm:max-w-[64px] bg-opacity-40 bg-slate-400'></div>
                                                                              </div>
                                                                        </>)
                                                            })
                                                      ) : (
                                                            subCategoryWiseProduct.map((product, index) => {
                                                                  return (
                                                                        <>
                                                                              <div className='flex flex-nowrap md:flex-col sm:flex-row  border p-[6px] rounded-md transition-all' key={index}
                                                                                    style={{
                                                                                          transform: `translateX(-${horizontalSlideCount * 100}%)`,
                                                                                          transitionProperty: 'transform',
                                                                                    }}
                                                                              >
                                                                                    <div id='productImage' className='w-full md:h-[220px] md:min-w-[200px] sm:h-[64px] sm:max-w-[64px] cursor-pointer'>
                                                                                          <img src={product.productImage[0]} className='h-full w-full object-scale-down hover:scale-110 transition-all cursor-pointer' />
                                                                                    </div>
                                                                                    <div id='productDetail' className=' ml-2 flex flex-col justify-center items-center'>
                                                                                          <div className='md:text-lg sm:text-base w-52 text-center select-none text-clip line-clamp-1  capitalize'>{product.productName}</div>
                                                                                          <div className='md:text-lg sm:text-base font-semibold select-none'>Just {formattedCurrency(product.productSellingPrice)} </div>
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
                  }
            </>
      )
}

export default HorizontalDisplayStream
