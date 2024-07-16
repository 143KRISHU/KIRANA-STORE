import { configureStore } from '@reduxjs/toolkit'
import  addToCartReducer  from './cartSlice.js'
import customerReducer from "./customerSlice.js"
import productReducer from "./productSlice.js"
// State ko localStorage mein save karne ka function
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('addTocart', serializedState);
  } catch (err) {
    console.error('Could not save state', err);
  }
};

// State ko localStorage se load karne ka function
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('addTocart');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load state', err);
    return undefined;
  }
};

// Initial state ko localStorage se load karna
const preloadedState = {
  addTocart: loadState(),
  // other preloaded states if any
};

const store = configureStore({
  reducer: {
      customer : customerReducer,
      product : productReducer,
      addTocart : addToCartReducer,
  },
  preloadedState,
})
// Redux state change hone par local storage update karna
store.subscribe(() => {
  saveState(store.getState().addTocart);
});

export default store
