import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { MdOutlineArrowBackIos } from "react-icons/md";
import productCategories from "../../HelperFiles/Productcategories.js"
import backendRoutesAPI from "../../BackendAPI/API.js"
import { toast } from "react-toastify"
import { setProductDetail } from '../../Store/productSlice.js';

function UpdateProductMenu() {
      const dispatch = useDispatch()
      const product = useSelector((state) => state?.product?.product)
      const customer = useSelector((state) => state?.customer?.customer)
      const [productData, setProductData] = useState(product)
      const [productCategory, setProductcategory] = useState([])
      const [productSubCategory, setProductSubCategory] = useState([])
      const params = useParams()

      const getCurrentProduct = async () => {
            const currentProductID = params.id
            const data = await fetch(backendRoutesAPI.admin.getCurrentProduct.url, {
                  method: backendRoutesAPI.admin.getCurrentProduct.method,
                  headers: {
                        "content-type": "application/json"
                  },
                  body: JSON.stringify({ _id: currentProductID })
            })
            const currentProduct = await data.json()
            if (currentProduct.success) {
                  setProductData(currentProduct.data)
                  dispatch(setProductDetail(currentProduct.data))
                  const categoriesArray = Object.keys(productCategories)
                  setProductcategory(categoriesArray);
                  setProductSubCategory(productCategories[currentProduct.data.category])
            }
            else {
                  toast.error(currentProduct.message)
            }
      }

      const handleMainCategoryChange = (e) => {
            const { name, value } = e.target
            if (value === "NONE") {
                  setProductData({ ...productData, [name]: "" })
                  setProductSubCategory([])
            }
            else {
                  setProductData({ ...productData, [name]: value })
                  setProductSubCategory(productCategories[value]);
            }
      }

      const handleSubCategoryChange = (e) => {
            const { name, value } = e.target
            setProductData({ ...productData, [name]: value })
      }

      const handleChange = (e)=>{
            const { id, value } = e.target
            setProductData({ ...productData, [id]: value })
      }

      useEffect(() => {
            getCurrentProduct()
      }, [])

      return (
            productData && customer?.role.toLowerCase() === "admin" ?
                  (<div className='max-w-[70%] mx-auto  ' >
                        <div className=' mx-auto py-4' style={{ backgroundColor: "#006D7740" }}>
                              <Fragment >
                                    <MdOutlineArrowBackIos className='text-2xl ml-4 cursor-pointer'/>
                              </Fragment>
                              {/*  Heading */}
                              <div className=" text-3xl text-center font-bold">
                                    <i><u>Update Product Id:  {productData._id}</u></i>
                              </div>
                              {/* Form Section */}
                              <form className='grid w-full p-8 mt-2 gap-4'>
                                    {/* Product Name */}

                                    <label htmlFor='productName' className='text-2xl font-semibold '>Name of Product :</label>
                                    <textarea type='text'
                                          id='productName'
                                          value={productData.productName}
                                          onChange={handleChange}
                                          className='border hidden-scrollbar bg-white p-2 rounded-sm w-full capitalize'
                                          placeholder='Enter the name of the Product'></textarea>
                                    <p className='text-red-500'></p>

                                    {/* PRoduct Barnd Name */}
                                    <label htmlFor='productBrand' className='text-2xl font-semibold '>Product Brand :</label>
                                    <input type='text'
                                          id='productBrand'
                                          value={productData.productBrand}
                                          onChange={handleChange}
                                          className='border bg-white p-2 rounded-sm w-full capitalize'
                                          placeholder='Enter the name of the Product' />
                                    <p className='text-red-500'></p>

                                    {/* Product Description */}
                                    <label htmlFor='productDescription' className='text-2xl font-semibold '>Product Description:</label>
                                    <textarea type='text'
                                          id='productDescription'
                                          rows={10}
                                          value={productData.productDescription}
                                          onChange={handleChange}
                                          className='border hidden-scrollbar bg-white p-2 rounded-sm w-full h-fit'
                                          placeholder='Enter the name of the Product'></textarea>
                                    <p className='text-red-500'></p>

                                    {/* Product Images */}
                                    <label htmlFor='productDescription' className='text-2xl font-semibold '>Product Images:</label>
                                    <div className='flex justify-evenly items-center mt-2 gap-5'>
                                          {
                                                (productData?.productImage).map((image,index) => {
                                                      return (
                                                            <div className='flex flex-col justify-center items-center ' key={index}>
                                                                  <img src={image} height='250px' width='250px' />
                                                                  <div className='mt-2 rounded-xl  border-2 border-[#006D77] hover:bg-[#006D77] hover:text-white cursor-pointer '>
                                                                        <label className='flex flex-col just items-center align-middle w-full cursor-pointer'>
                                                                              <h1 className='px-4 py-2'>Choose Image To Update</h1>
                                                                              <input type='file' className='hidden w-full' />
                                                                        </label>
                                                                  </div>
                                                            </div>
                                                      )
                                                })
                                          }
                                    </div>

                                    <div className='flex gap-4 w-full mt-4 justify-between items-center '>
                                          {/* Product Listing Price */}
                                          <div className='flex flex-col justify-center items-center align-middle w-full max-w-96 gap-2'>
                                                <label htmlFor='productListingPrice' className='text-2xl font-semibold '>Product Listing Price</label>
                                                <input type='number'
                                                      id='productListingPrice'
                                                      value={productData.productListingPrice}
                                                      onChange={handleChange}
                                                      className='border bg-white p-2 rounded-lg w-full text-center'
                                                      placeholder='Enter the name of the Product' />
                                                <p className='text-red-500'></p>
                                          </div>

                                          {/* Product Selling Price */}
                                          <div className='flex flex-col justify-center items-center w-full max-w-96 gap-2'>
                                                <label htmlFor='productSellingPrice' className='text-2xl font-semibold '>Product Selling Price</label>
                                                <input type='number'
                                                      id='productSellingPrice'
                                                      value={productData.productSellingPrice}
                                                      onChange={handleChange}
                                                      className='border bg-white p-2 rounded-lg w-full text-center  '
                                                      placeholder='Enter the name of the Product' />
                                                <p className='text-red-500'></p>
                                          </div>
                                    </div>
                                    {/* Product Main Category */}

                                    <label htmlFor='category' className='text-xl font-semibold mr-10'>Main Category:</label>
                                    <select value={productData.category} name="category" className='border bg-white px-2 py-2 rounded-sm'
                                          onChange={handleMainCategoryChange}>
                                          <option>NONE</option>
                                          {
                                                productCategory.map((el, index) => {
                                                      return <option value={el} key={index}>{el}</option>
                                                })
                                          }
                                    </select>
                                    <p className='text-red-500'></p>

                                    {/* Product Sub Category */}

                                    <label htmlFor='subcategory' className='text-xl font-semibold mr-10'>Sub-Category:</label>
                                    <select value={productData.subcategory} className='border bg-white px-2 py-2 rounded-sm'
                                          onChange={handleSubCategoryChange} name="subcategory">
                                          {
                                                productSubCategory?.length > 0 ? (productSubCategory.map((el, index) => {
                                                      return <option value={el} key={index}>{el}</option>
                                                })) : null
                                          }
                                    </select>
                                    <p className='text-red-500'></p>
                              </form>
                        </div>
                  </div>) : (null)
      )
}

export default UpdateProductMenu
