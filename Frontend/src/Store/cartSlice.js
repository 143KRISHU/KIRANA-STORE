import { createSlice } from '@reduxjs/toolkit'

const initialState = {
      totalNumberOfProduct: 0,
      productId : [],
      itemsData :{},
      cartItems :[],
      totalCartPrice:0
}

export const addToCartSlice = createSlice({
      name: 'addToCart',
      initialState,
      reducers: {
            // This is used to for the Guest User
            setProductDetail: (state, action) => {
                  if(!state.productId.includes(action.payload.id)){
                        state.productId.push(action.payload.id);
                        state.totalNumberOfProduct = state.productId.length;
                        state.itemsData[action.payload.id]={quantity : 1,price:action.payload.price} 
                  }
                  else{
                        state.itemsData[action.payload.id].quantity = state.itemsData[action.payload.id].quantity + 1;
                  }
            },
            resetProductDetail:(state)=>{
                  state.totalNumberOfProduct = 0
                  state.productId = []
                  state.itemsData = {}
                  state.totalCartPrice=0
            },
            // This function is for the Registered User
            setCurrentCustomerCartDetail :(state,action) =>{
                  console.log(action.payload)
                  state.cartItems = action.payload.items;
                  state.totalCartPrice = action.payload.totalCartPrice
                  state.totalNumberOfProduct = action.payload.totalNumberOfProduct
                  state.productId = state.cartItems.map((product)=>{
                        state.itemsData[product.productId._id] = {quantity : product.quantity,price:product.price} 
                        return product.productId._id
                  })
                  console.log(state.productId,state.itemsData)
            },
      },
})

// Action creators are generated for each case reducer function
export const { setProductDetail , resetProductDetail,setCurrentCustomerCartDetail} = addToCartSlice.actions

export default addToCartSlice.reducer