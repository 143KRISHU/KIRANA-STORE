import React, { useState ,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegTrashAlt } from "react-icons/fa";
import backendRoutesAPI from '../BackendAPI/API';
import { toast } from 'react-toastify';
import { decProductCount, incProductCount } from '../Store/cartSlice';

function AddToCartPage() {
  const dispatch = useDispatch()
  let cartData = useSelector((state) => state?.addTocart)
  let allProdct = cartData?.items
  const [totalCartPrice,setTotalCartPrice]=useState(0)
  const [isProductCoutUpdating,setIsProductCountUpdating]=useState(false)
  const formattedCurrency = (number) => {
    return (
      number.toLocaleString('en-US', {
        style: 'currency',
        currency: 'INR', // Change to your desired currency code
      }))
  }

  const increaseProductCount =(currProduct)=>{
    const product = currProduct.product
    updateQunatity({productId : product._id,action:'inc'})
  }

  const decreaseProductCount =(currProduct)=>{
    console.log('Product Detail',currProduct)
    const product = currProduct.product
    const quantity = currProduct.quantity
    if(quantity>1){
      updateQunatity({productId : product._id,action:'dec'})
    }
    else{
      console.log('Product Removed From The Cart')
    }
  }
  const updateQunatity = async(data)=>{
    setIsProductCountUpdating(true)
    const backendResponse = await fetch(backendRoutesAPI.updateCartProductCount.url,{
      method:backendRoutesAPI.updateCartProductCount.method,
      credentials:'include',
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(data)
    })
    const finalRes = await backendResponse.json()
    if(finalRes.success){
      toast.success(finalRes.message)
      if(data.action === 'inc'){
        dispatch(incProductCount(data))
        console.log(cartData)
      }
      else{
        dispatch(decProductCount(data))
      }
      setIsProductCountUpdating(false)
    }
    else{
      toast.error(finalRes.message)
      setIsProductCountUpdating(false)
    }
  }

  useEffect(() => {
  if(allProdct.length>0){
    setTotalCartPrice(allProdct.reduce((acc,item)=>acc + item.product.productSellingPrice * item.quantity,0))
  }
  }, [])

  
  return (
    <div className="mx-auto max-w-7xl px-2 lg:px-0">
      <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>
            <ul role="list" className="divide-y divide-gray-200 p-2">
              {
                allProdct.map((product) => (
                  <div key={product.product._id} className="">
                    <li className="flex py-6 sm:py-6 ">
                      <div className="flex-shrink-0">
                        <img
                          src={product.product.productImage[0]}
                          alt={product.product.productName}
                          className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <a href={`productDetail/${product.product._id}/view/${product.product.productName}`} className="font-semibold text-black capitalize md:text-xl">
                                  {product.product.productName}
                                </a>
                              </h3>
                            </div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <p  className="font-semibold text-slate-400 capitalize md:text-md">
                                  ( {product.product.productBrand} )
                                </p>
                              </h3>
                            </div>
                            <div className="mt-2
                            + flex items-end">
                              <p className="text-xs font-medium text-gray-500 line-through">
                              {formattedCurrency(product.product.productListingPrice)}
                              </p>
                              <p className="text-sm font-medium text-gray-900">
                                &nbsp;&nbsp;{formattedCurrency(product.product.productSellingPrice)}
                              </p>
                              &nbsp;&nbsp;
                              <p className="text-sm font-medium text-green-500">{}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <div className="mb-2 flex">
                      <div className="min-w-24 flex">
                        <button type="button" className="h-7 w-7" onClick={()=>decreaseProductCount(product)}
                          disabled={isProductCoutUpdating ? true : false}
                          style={{cursor:isProductCoutUpdating?'not-allowed':'pointer'}}>
                          -
                        </button>
                        <input
                          type="text"
                          className="mx-1 h-7 w-9 rounded-md border text-center"
                          defaultValue={product.quantity}
                        />
                        <button type="button" className="flex h-7 w-7 items-center justify-center" onClick={()=>increaseProductCount(product)}
                        disabled={isProductCoutUpdating ? true : false} style={{cursor:isProductCoutUpdating?'not-allowed':'pointer'}}>
                          +
                        </button>
                      </div>
                      <div className="ml-6 flex text-sm">
                        <button type="button" className="flex items-center gap-2 space-x-1 px-2 py-1 pl-0">
                          <FaRegTrashAlt size={12} className="text-red-500" />
                          <span className="text-xs font-medium text-red-500">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              }
            </ul>
          </section>
          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
          >
            <h2
              id="summary-heading"
              className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
            >
              Price Details
            </h2>
            <div>
              <dl className=" space-y-1 px-2 py-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-800">Price ({(allProdct.length)} items)</dt>
                  <dd className="text-sm font-medium text-gray-900">{formattedCurrency(totalCartPrice)}</dd>
                </div>
                {/* <div className="flex items-center justify-between pt-4">
                  <dt className="flex items-center text-sm text-gray-800">
                    <span>Discount</span>
                  </dt>
                  <dd className="text-sm font-medium text-green-700"></dd>
                </div> */}
                <div className="flex items-center justify-between py-4">
                  <dt className="flex text-sm text-gray-800">
                    <span>Delivery Charges</span>
                  </dt>
                  <dd className="text-sm font-medium text-green-700">Free</dd>
                </div>
                <div className="flex items-center justify-between border-y border-dashed py-4 ">
                  <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                  <dd className="text-base font-medium text-gray-900">{formattedCurrency(totalCartPrice)}</dd>
                </div>
              </dl>
              <div className="px-2 pb-4 font-medium text-green-700">
                You will save ₹ 3,431 on this order
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
    // <div className='p-4 w-full'>
    //   {
    //     allProdct.length > 0 ? (
    //       <div className='w-full p-2 flex'>
    //         <div id='left-pane' className='w-full'>
    //           {
    //             allProdct.map((item, index) => {
    //               return (
    //                 <div key={index} className='bg-white w-full p-3 flex justify-evenly'>
    //                     <div className='h-28 w-28 border-2 border-black'>
    //                       <img src={item.product.productImage[0]} />
    //                     </div>
    //                     <div>
    //                       <p className='text-lg capitalize font-semibold'>{item.product.productName}</p>
    //                       <p className='text-lg capitalize text-slate-400'>{item.product.productBrand}</p>
    //                       <div className='flex gap-2 items-center align-middle'>
    //                         <p className='text-lg flex capitalize text-red-500'>Price:{formattedCurrency(item.product.productSellingPrice)}</p>
    //                         <p className='text-base capitalize text-slate-500 line-through'>{formattedCurrency(item.product.productListingPrice)}</p>
    //                       </div>
    //                       <p className='text-xl capitalize text-red-500'>Qunatity :{item.quantity}</p>
    //                     </div>
    //                     <p className='text-xl capitalize text-red-500'>Total Price :{formattedCurrency(item.product.productSellingPrice * item.quantity)}</p>
    //                 </div>
    //               )
    //             })
    //           }
    //         </div>
    //         <div id='right-pane' className='bg-red-500 p-2'>

    //         </div>
    //       </div>
    //     ) : <div>
    //       Your Cart is Empty
    //     </div>

    //   }

    // </div>

  )
}

export default AddToCartPage