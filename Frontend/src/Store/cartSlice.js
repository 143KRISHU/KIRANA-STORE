import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import backendRoutesAPI from '../BackendAPI/API'

//Action for Storing
export const saveCartItems = createAsyncThunk('saveCartItems', async (item) => {
      const itemId = item._id
      const backendAPIResponse = await fetch(backendRoutesAPI.loggedInCustomerCartDetail.url, {
            method: backendRoutesAPI.loggedInCustomerCartDetail.method,
            credentials: 'include',
            headers: {
                  'content-type': 'application/json'
            },
            body: JSON.stringify({ _id: itemId })
      })
      const finalRes = await backendAPIResponse.json()
      if(finalRes.success){
            console.log(finalRes)
            return finalRes
      }
      else{
            toast.error(finalRes.message)
      }
})
const initialState = {
      totalNumberOfProduct: 0,
      items: [],
      totalCartPrice: 0
}

export const addToCartSlice = createSlice({
      name: 'addToCart',
      initialState,
      reducers: {
            // This is used to for the Guest User
            setProductDetail: (state, action) => {
                  state.items.push({product:action.payload,quantity:1})
                  state.totalNumberOfProduct = state.items.length
            },
            resetProductDetail: (state) => {
                  state.totalNumberOfProduct = 0
                  state.items = []
                  state.totalCartPrice = 0
            },
            //This function is used to set the data of the Customer when it login again
            setCurrentCustomerCartDetail:(state,action)=>{
                  action.payload.items.map((item)=>{
                        state.items.push({product:item.productId,quantity:item.quantity})
                  })
                  state.totalNumberOfProduct = state.items.length
            },
            incProductCount:(state,action)=>{
                  const existingItemIndex = state.items.findIndex((item)=>item.product._id === action.payload.productId)
                  console.log(existingItemIndex)
                  if(existingItemIndex>=0){
                        state.items[existingItemIndex].quantity =state.items[existingItemIndex].quantity + 1
                  }
            },
            decProductCount:(state,action)=>{
                  const existingItemIndex = state.items.findIndex((item)=>item.product._id === action.payload.productId)
                  console.log(existingItemIndex)
                  if(existingItemIndex>=0){
                        if(state.items[existingItemIndex].quantity > 1){
                              state.items[existingItemIndex].quantity =state.items[existingItemIndex].quantity - 1
                        }else{
                              
                        }
                        
                  }
            }
      },
})

// Action creators are generated for each case reducer function
export const { setProductDetail, resetProductDetail, setCurrentCustomerCartDetail,incProductCount,decProductCount } = addToCartSlice.actions

export default addToCartSlice.reducer


