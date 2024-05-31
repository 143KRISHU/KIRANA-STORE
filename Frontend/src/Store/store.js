import { configureStore } from '@reduxjs/toolkit'
import customerReducer from "./customerSlice.js"
import productReducer from "./productSlice.js"
export const store = configureStore({
  reducer: {
      customer : customerReducer,
      product : productReducer
  },
})