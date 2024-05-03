import { configureStore } from '@reduxjs/toolkit'
import customerReducer from "./customerSlice.js"
export const store = configureStore({
  reducer: {
      customer : customerReducer
  },
})