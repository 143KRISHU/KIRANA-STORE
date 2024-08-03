import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import backendRoutesAPI from '../BackendAPI/API'
import { FaCartArrowDown } from "react-icons/fa6";
import { BsFillBagHeartFill } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux"
import { setProductDetail, saveCartItems } from '../Store/cartSlice';

function ProductDetailPage() {
      const params = useParams()
      const dispatch = useDispatch()
      const naviagte = useNavigate()
      const currentCustomer = useSelector((state) => state?.customer?.customer)
      const cart = useSelector((state) => state?.addTocart?.items)
      const productAddStatus = useSelector((state) => {
            console.log(state?.addTocart?.addProductStatus)
            return state?.addTocart?.addProductStatus})
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
      const addToCartButtonAction = async (e) => {
            e.preventDefault()
            if (currentCustomer) {
                  if (cart.length > 0) {
                        const conatinsProduct = cart.find((item) => item.product._id.toString() === productInfo._id.toString())
                        if (conatinsProduct === undefined) {
                              dispatch(setProductDetail(productInfo))
                              dispatch(saveCartItems(productInfo))
                              if(productAddStatus === 'fullfilled'){
                                    naviagte('/yourcart')
                              }
                        }
                        else {
                              naviagte('/yourcart')
                        }
                  }
                  else {
                        dispatch(setProductDetail(productInfo))
                        dispatch(saveCartItems(productInfo))
                  }
            }
            else {
                  naviagte('/login')
            }
      }
      useEffect(() => {
            getCurrentProductData()
      }, [])

      return (
            <div className='px-6 py-8 bg-[#EDF6F9] '>
                  <div className='flex justify-evenly w-full  gap-4 displayMainConatinare'>
                        <div className='flex lg:flex-row-reverse gap-4 justify-evenly imageDisplayDiv relative'>
                              {/* Image View  Section */}
                              <>
                                    {
                                          isLoading ? (
                                                <div className='h-[30rem] w-full max-w-[30rem] rounded-xl shadow-xl bg-slate-200 animate-pulse p-1'>
                                                </div>
                                          ) : (
                                                <div className='h-full max-h-[30rem] w-full max-w-[30rem] rounded-xl shadow-xl activeImageDiv'>
                                                      <img src={activeImage} className='h-full w-full transition-all object-scale-down mix-blend-multiply 
                                                      rounded-xl cursor-pointer' />
                                                </div>
                                          )
                                    }
                              </>
                              {/* Side Images Section */}
                              <div className=' h-full max-h-[30rem] w-fit p-2 flex flex-col gap-2 hidden-scrollbar2 overflow-scroll  rounded-md sideImasgesDisplay'>
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
                                                            <div className='h-24 w-24  cursor-pointer group allSideImages' key={index}
                                                                  onMouseEnter={() => { setActiveImage(imageUrl) }}
                                                                  onTouchMove={() => { setActiveImage(imageUrl) }} >
                                                                  <img src={imageUrl} className='h-full w-full object-scale-down' />
                                                            </div>
                                                      )
                                                })
                                          )
                                    }
                              </div>
                        </div>
                        {/* Image Zoom Display */}

                        {/* Product Detail's */}
                        <div className='w-full max-w-[44rem] px-2 productDescriptionConatiner'>
                              <p className='bg-[#006D77] inline-block mb-1 text-white text-center px-3 py-1 capitalize text-2xl rounded-full font-semibold productBrand'>{productInfo.productBrand}</p>
                              <p className='productName text-4xl capitalize font-bold mb-1'>{productInfo.productName}</p>
                              <p className='text-lg text-slate-400 font-semibold mb-1 caiptalize'>{productInfo.subcategory}</p>
                              <div className="flex flex-col justify-start align-middle mt-3 mb-2">
                                    <div className='flex align-middle gap-2 items-center mb-2'>
                                          <p className='text-3xl font-light text-[red]'>{-Math.round(((productInfo.productListingPrice - productInfo.productSellingPrice) / productInfo.productListingPrice) * 100)}%</p>
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
                              {/* Action Button Section */}
                              <div className='w-full mt-4'>
                                    <div className='w-full flex justify-between gap-2 p-2'>
                                          <button className='w-full flex justify-evenly items-center p-2 text-xl font-medium text-[#fff]
                                                 bg-green-500 rounded-xl border-2 border-[#fff]  addToCartBtn
                                                 hover:bg-white hover:text-green-500 hover:border-2 hover:border-green-500'
                                                onClick={addToCartButtonAction}>
                                                <p>Add To Cart</p><span className='text-2xl'><FaCartArrowDown /></span>
                                          </button>
                                          <button className='w-full flex justify-evenly items-center p-2 text-xl font-medium text-[#fff]
                                                 bg-blue-500 rounded-xl border-2 border-[#fff]  buyTheProductBtn
                                                 hover:bg-white hover:text-blue-500 hover:border-2 hover:border-blue-500'
                                                onClick={(e) => { e.preventDefault() }}>
                                                <p>Buy The Product</p> <span className='text-2xl'><BsFillBagHeartFill /></span>
                                          </button>
                                    </div>
                              </div>
                              {/* Add Review section */}
                              <div className='mt-2'>
                                    <form className='flex flex-col w-full p-2 gap-2 review-form'>
                                          <label htmlFor='review' className='text-xl font-bold'>Share Your Review</label>
                                          <div className='w-full flex'>
                                                <input name="review" id="review" cols="30" rows="3" placeholder='Share Your Thoughts'
                                                      className='bg-slate-200 w-full  text-base p-2 text-black' />
                                                <button className='mx-auto px-3 py-1  font-medium bg-slate-200 text-[#006D77]'
                                                      onClick={(e) => { e.preventDefault() }}>
                                                      <IoIosSend />
                                                </button>
                                          </div>
                                    </form>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default ProductDetailPage
