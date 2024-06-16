import React, { useEffect, useState } from 'react'
import backendRoutesAPI from '../../BackendAPI/API'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

function CategoryList() {
      const [productsCategory, setProductsCategory] = useState([])
      const [isLoading, setIsLoading] = useState(false)
      const [loadingScreen, setLoadingScreen] = useState([1, 2, 3, 4, 5,6])

      const getProductCategories = async () => {
            setIsLoading(true)
            const backendResponse = await fetch(`${backendRoutesAPI.homePageAPI.showCategories.url}`)
            const finalResponse = await backendResponse.json()
            if (finalResponse.success) {
                  setProductsCategory(finalResponse.data)
                  setIsLoading(false)
            }
            else {
                  toast.error(finalResponse.message)
                  setIsLoading(false)
            }
      }

      useEffect(() => {
            getProductCategories()
      }, [])
      return (
            /* Top Cateorgy Nav links */
            <div className='flex gap-4 p-2 items-center justify-evenly overflow-scroll hidden-scrollbar2 '>
                  {
                        isLoading ? (
                              <>
                                    {
                                          loadingScreen.map((index) => {
                                                return (
                                                      <div className='flex flex-col justify-center items-center'key={index}>
                                                            <div  className='category-image md:h-24 md:w-24 rounded-xl flex overflow-hidden 
                                                                  justify-center items-center cursor-pointer bg-slate-300 animate-pulse'>
                                                            </div>
                                                            <p className='text-center mx-auto capitalize h-5 mt-1 w-24 rounded-xl bg-slate-300 animate-pulse'></p>
                                                      </div>
                                                )
                                          })
                                    }
                              </>
                        ) : (
                              <>
                                    {
                                          productsCategory?.map((category, index) => {
                                                return (
                                                      <Link to={`products/${category.category}`} className='flex flex-col justify-center items-center 'key={index}>
                                                            <div className=' category-image border-2 border-[#006D77] md:h-24 md:w-24 rounded-xl flex overflow-hidden 
                                                             justify-center items-center cursor-pointer'>
                                                                  <img src={category?.productImage[0]} alt={category?.category}
                                                                        className='h-full object-fill  bg-white' />
                                                            </div>
                                                            <p className='font-semibold text-center mx-auto capitalize text-sm md:text-base'>{category.category}</p>
                                                      </Link>
                                                )
                                          })
                                    }
                              </>
                        )
                  }
            </div>
      )
}

export default CategoryList
