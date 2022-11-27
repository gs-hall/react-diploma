import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log('actionGetCart', action.payload);
      state.isLoading = true;
      state.isError = false;
      state.isReloadRequired = false;
    },
  }
});

export const { addToCart } = cartSlice.actions;
export const selectCart = (state) => state.cart;
export const selectCountInCart = (state) => state.cart.items.length;
export default cartSlice.reducer;
