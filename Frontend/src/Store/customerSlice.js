import { createSlice } from '@reduxjs/toolkit'

const initialState = {
      customer: null,
}

export const customerSlice = createSlice({
      name: 'customer',
      initialState,
      reducers: {
            setCustomerDetail: (state, action) => {
                  state.customer = action.payload;
            }
      },
})

// Action creators are generated for each case reducer function
export const { setCustomerDetail } = customerSlice.actions

export default customerSlice.reducer