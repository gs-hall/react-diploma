import { createSlice, current } from '@reduxjs/toolkit';

export const localStorageCartKey = 'cart';

const initialState = {
  data: null // data[product][size] = { count, price, title }
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log('addToCart', action.payload);
      const { id, title, price, size, count } = action.payload;
      if (!state.data.hasOwnProperty(id)) { // add product for the 1st time
        state.data[id] = {};
      };
      if (state.data[id].hasOwnProperty(size)) { // increase count
        state.data[id][size].count += count;
      } else { // add product size
        state.data[id][size] = { id, title, price, size, count };
      };
      console.log('addToCart result ', JSON.stringify(state.data));
      console.log('addToCart current ', current(state.data));
      localStorage.setItem(localStorageCartKey, JSON.stringify(state.data));
    },

    setCartData: (state, action) => {
      console.log('setCartData action.payload=', action.payload);
      state.data = action.payload;
      console.log('setCartData result ', JSON.stringify(state.data));
      console.log('setCartData current ', current(state));
    }
  }
});

export const { addToCart, setCartData } = cartSlice.actions;

export const selectCartData = (state) => state.cart.data;

export const getCartAsArray = (data) => { // convert to array
  console.log('getCartAsArray data = ', data);
  return Object.keys(data)?.flatMap(productID => (
    Object.keys(data[productID])?.map(size => (
      data[productID][size]
    ))));
};
export const selectCountInCart = (state) => (state.cart.data == null ? 0 : Object.keys(state.cart.data).length);
export default cartSlice.reducer;
