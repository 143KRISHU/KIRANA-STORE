import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import backendRoutesAPI from '../../BackendAPI/API'
import { IoFunnelSharp } from "react-icons/io5";
import ProductCard2 from '../ProductCard2/ProductCard2'
import productCategories from '../../HelperFiles/Productcategories';
import { toast } from 'react-toastify';

function SpecificCategoryPage() {
  const params = useParams()
  const [items, setitems] = useState()
  const [filteredProduct, setFilterdProduct] = useState([])
  const [subCategories, setSubCategories] = useState([]) // For storing the subacteogries from the helper File
  const [selectedCategories, setSelectedCategories] = useState([]); // For storig the user selected subcategories they want to see 
  const handleToggle = (subCategory) => {
    if (selectedCategories.includes(subCategory)) {
      // Remove the category if it's already selected
      setSelectedCategories(selectedCategories.filter(cat => cat !== subCategory));
    } else {
      // Add the category if it's not selected
      setSelectedCategories([...selectedCategories, subCategory]);
    }
  };
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
  // Sub Category Filter
  useEffect(()=>{
    if(selectedCategories.length === 0 || selectedCategories.length === subCategories.length){
      setFilterdProduct([])
    }
    else{
      const filteredProduct = items.filter((item) => selectedCategories.some(badges => item.subcategory.includes(badges)))
      if(filteredProduct.length === 0){
        toast.warning('For The Seleced Sub Category Products are Un-Available')
      }
      setFilterdProduct(filteredProduct)
    }
  },[selectedCategories])

  useEffect(() => {
    getProductData()
    setSubCategories(productCategories[`${params.productcategory}`])
  }, [])
  return (
    <div className='bg-[#EDF6F9] py-5 flex flex-col gap-2'>
      <h1 className='md:text-3xl px-5 sm:text-2xl flex-shrink-0 flex items-center gap-3 font-medium'>Products Fall Under Category : <span className='text-[#006D77] sm:text-2xl md:text-4xl font-bold '>{params.productcategory}</span></h1>
      <div className='flex flex-col justify-end px-6 gap-1'>
        <div className='flex justify-evenly z-40 px-6 py-2'>
          {
            subCategories?.map((subCategory, index) => {
              return (
                <div
                  key={index}
                  className={`badge px-3 py-1.5 m-1 text-[16px] cursor-pointer rounded-full border border-gray-300 
                    ${selectedCategories.includes(subCategory)
                      ? 'bg-[#006D77] text-white'
                      : 'bg-gray-200 text-gray-700'
                    }`}
                  onClick={() => handleToggle(subCategory)}
                >
                  {subCategory}
                </div>
              )
            })
          }
        </div>
        {/* {
          selectedCategories.length > 0 &&
          <button className='px-3 text-[14px] py-1.5 rounded-full ml-auto mr-16 flex justify-end bg-blue-500 text-white'
            onClick={handleApplyFilter}
          >
            Apply
          </button>
        } */}
      </div>
      <hr className='border-2 mt-1 ml-5 mr-5' />
      <div className='w-full h-[100vh] overflow-y-scroll hidden-scrollbar flex flex-wrap gap-6 justify-evenly align-middle mt-3'>
        {
          filteredProduct.length > 0 ?
            filteredProduct?.map((item) => {
              return <ProductCard2 product={item} key={item._id} />
            })
            :
            items?.map((item) => {
              return <ProductCard2 product={item} key={item._id} />
            })
        }
      </div>
    </div>
  )
}

export default SpecificCategoryPage
