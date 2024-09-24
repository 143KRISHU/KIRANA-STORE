import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import backendRoutesAPI from '../../BackendAPI/API'
import { IoFunnelSharp } from "react-icons/io5";
import ProductCard2 from '../ProductCard2/ProductCard2'

function SpecificCategoryPage() {
  const params = useParams()
  const [items, setitems] = useState()
  const getProductData = async () => {
    const backendResponse = await fetch(backendRoutesAPI.homePageAPI.categoryWiseProduct.url, {
      method: backendRoutesAPI.homePageAPI.categoryWiseProduct.method,
      headers: {
        'content-type': "application/json"
      },
      body: JSON.stringify({ category: params.productcategory })
    })
    const finalRes = await backendResponse.json()
    if (finalRes.success) {
      setitems(finalRes.data)
    }
  }
  useEffect(() => {
    getProductData()
  }, [])
  return (
    <div className='bg-[#EDF6F9] py-5 flex flex-col'>
      <h1 className='md:text-3xl px-5 sm:text-2xl flex-shrink-0 flex items-center gap-3 font-medium'>Products Fall Under Category : <span className='text-[#006D77] sm:text-2xl md:text-4xl font-bold '>{params.productcategory}</span></h1>
      <hr className='border-2 mt-3 ml-5 mr-5' />
      {/* <div className='w-full mt-4 flex  px-4'> */}
      <div className='w-full h-[100vh] overflow-y-scroll hidden-scrollbar flex flex-wrap gap-6 justify-evenly align-middle mt-3'>
        {
          items?.length > 0 && items.map((item) => {
            return <ProductCard2 product={item} key={item._id} />
          })
        }
      </div>
      {/* </div> */}
    </div>
  )
}

export default SpecificCategoryPage
