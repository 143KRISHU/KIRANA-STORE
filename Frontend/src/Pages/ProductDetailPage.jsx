import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import backendRoutesAPI from '../BackendAPI/API'

function ProductDetailPage() {
      const params = useParams()
      const [productInfo, setProductInfo] = useState({})
      const [isLoading, setIsloading] = useState(false)
      const [activeImage, setActiveImage] = useState('')
      const sideImage = new Array(5).fill(null)
      const navigate = useNavigate()
      const id = params.id
      const formattedCurrency = (number) => {
            return (
                  number.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'INR', // Change to your desired currency code
                  }))
      }
      const getCurrentProductData = async () => {
            setIsloading(true)
            const backendResponse = await fetch(backendRoutesAPI.admin.getCurrentProduct.url, {
                  method: backendRoutesAPI.admin.getCurrentProduct.method,
                  headers: {
                        "content-type": "application/json"
                  },
                  body: JSON.stringify({ _id: id })
            })
            const finalRes = await backendResponse.json()
            if (finalRes.success) {
                  setProductInfo({ ...finalRes.data })
                  setActiveImage(finalRes.data.productImage[0])
                  setIsloading(false)
            }
            else {
                  toast.error(finalRes.message)
                  navigate('/')
            }
      }
      console.log(productInfo)
      useEffect(() => {
            getCurrentProductData()
      }, [])

      return (
            <div className='p-2'>
                  <div className='p-2'>
                        <div className=' p-2 bg-white'>
                              <div className='flex flex-row lg:flex-col w-full  p-2 gap-2'>
                                    {/* Side Images Section */}
                                    <div className='h-[30rem] w-fit p-2 flex  md:flex-col gap-3  rounded-md'>
                                          {
                                                isLoading ? (
                                                      sideImage.map((_, index) => {
                                                            return (
                                                                  <div className='h-20 w-20 bg-slate-200 p-1 animate-pulse' key={index}></div>
                                                            )
                                                      })
                                                ) : (
                                                      productInfo?.productImage?.map((imageUrl, index) => {
                                                            return (
                                                                  <div className='h-24 w-24  cursor-pointer group' onMouseEnter={() => { setActiveImage(imageUrl) }}>
                                                                        <img src={imageUrl} className='h-full w-full object-scale-down' />
                                                                  </div>
                                                            )
                                                      })
                                                )
                                          }
                                    </div>
                                    {/* Image View  Section */}
                                    <>
                                          {
                                                isLoading ? (
                                                      <div className='h-[30rem] w-[30rem] rounded-xl shadow-xl bg-slate-200 animate-pulse p-1'>
                                                      </div>
                                                ) : (
                                                      <div className='h-[30rem] w-[30rem]  rounded-xl shadow-xl'>
                                                            <img src={activeImage} className='h-full w-full transition-all object-scale-down rounded-xl cursor-pointer' />
                                                      </div>
                                                )
                                          }
                                    </>
                                    {/* Product Detail's */}
                                    <div className='w-full max-w-[52rem] ml-3'>
                                          <p className='bg-[#006D77] inline-block mb-1 text-white text-center px-3 py-1 capitalize text-2xl rounded-full font-semibold'>{productInfo.productBrand}</p>
                                          <p className='text-4xl capitalize font-bold mb-1'>{productInfo.productName}</p>
                                          <p className='text-lg text-slate-400 font-semibold mb-1 caiptalize'>{productInfo.subcategory}</p>
                                          <div className="flex flex-col justify-start align-middle mt-3 mb-2">
                                                <div className='flex align-middle gap-2 items-center mb-2'>
                                                <p className='text-3xl font-light text-[red]'>{-Math.round(((productInfo.productListingPrice - productInfo.productSellingPrice)/ productInfo.productListingPrice)*100)}%</p>
                                                <p className='text-3xl font-bold '>{productInfo.productSellingPrice !== undefined ? formattedCurrency(productInfo.productSellingPrice) : null}</p>
                                                </div>
                                                <p className='text-sm font-medium text-slate-400'>
                                                      <span className='mr-1 '>M.R.P:</span>
                                                      <span className='line-through'>{productInfo.productListingPrice !== undefined ? formattedCurrency(productInfo.productListingPrice) : null}</span></p>
                                          </div>
                                          {/* Total Rating Section */}
                                          <div></div>
                                          {/* Product Description */}
                                          <p className='flex flex-col text-sm mb-2 text-justify'>
                                                {productInfo.productDescription}
                                          </p>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default ProductDetailPage
