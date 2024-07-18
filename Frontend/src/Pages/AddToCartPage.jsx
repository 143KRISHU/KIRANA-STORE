import React from 'react'
import { useSelector } from 'react-redux'

function AddToCartPage() {
  const cartData = useSelector((state) => state?.addTocart)
  const allProdct = cartData?.cartItems
  const totalPrice = cartData?.totalCartPrice
  const totalNumberOfProduct = cartData?.totalNumberOfProduct
  console.log('allProduct', allProdct)
  console.log('totalPrice', totalPrice)
  console.log('totalNumberOfProduct', totalNumberOfProduct)
  const formattedCurrency = (number) => {
    return (
          number.toLocaleString('en-US', {
                style: 'currency',
                currency: 'INR', // Change to your desired currency code
          }))
}
  return (
    <div className='p-4'>
      {
        allProdct.length > 0 ? (
          <div className='w-full p-2 cartConatiner '>
            <div className='p-2'>
              {
                allProdct.map((item, index) => {
                  return (
                    <div key={index} className='bg-white w-full mb-2  p-3 gap-4 cartItemDiv'>
                      <div className='h-28 w-28 p-2 mx-auto border-2 border-black'>
                        <img src={item.productId.productImage[0]} />
                      </div>
                      <div>
                        <p className='text-lg capitalize font-semibold'>{item.productId.productName}</p>
                        <p className='text-lg capitalize text-slate-400'>{item.productId.productBrand}</p>
                        <div className='flex gap-2 items-center align-middle'>
                        <p className='text-lg flex capitalize text-red-500'>Price:{formattedCurrency(item.price)}</p>
                        <p className='text-base capitalize text-slate-500 line-through'>{formattedCurrency(item.productId.productListingPrice)}</p>
                        </div>
                        
                      </div>
                      <div>
                      <p className='text-xl capitalize text-red-500'>Total Price :{formattedCurrency(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className='bg-blue-400 p-2'></div>
          </div>
        ) : <div>
          Your Cart is Empty
        </div>

      }

    </div>

  )
}

export default AddToCartPage