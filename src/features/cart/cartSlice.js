import { createSlice, current } from '@reduxjs/toolkit';

export const localStorageCartKey = 'cart';

const initialState = {
  data: null // data[product][size] = { count, price, title }
};

function saveDataToLocalStorage(data) {
  localStorage.setItem(localStorageCartKey, JSON.stringify(data));
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      //console.log('addToCart', action.payload);
      const { id, title, price, size, count } = action.payload;
      if (state.data === null) {
        state.data = {};
      };
      if (!state.data.hasOwnProperty(id)) { // add product for the 1st time
        state.data[id] = {};
      };
      if (state.data[id].hasOwnProperty(size)) { // increase count
        state.data[id][size].count += count;
      } else { // add product size
        state.data[id][size] = { id, title, price, size, count };
      };
      //console.log('addToCart result ', JSON.stringify(state.data));
      saveDataToLocalStorage(state.data);
    },

    setCartData: (state, action) => {
      //console.log('setCartData action.payload=', action.payload);
      state.data = action.payload;
      //console.log('setCartData result ', JSON.stringify(state.data));
      //console.log('setCartData current ', current(state));
    },

    deleteFromCart: (state, action) => {
      //console.log('deleteFromCart', action.payload);
      const { id, size } = action.payload;
      delete state.data[id][size];
      if (Object.keys(state.data[id]).length === 0) { // no sizes left
        delete state.data[id];
      };
      //console.log('deleteFromCart result ', JSON.stringify(state.data));
      //console.log('deleteFromCart current ', current(state.data));
      saveDataToLocalStorage(state.data);
    },
  }
});

export const { addToCart, setCartData, deleteFromCart } = cartSlice.actions;

export const selectCartData = (state) => state.cart.data;

export const getCartAsArray = (data) => { // convert to array
  //console.log('getCartAsArray data = ', data);
  return Object.keys(data)?.flatMap(productID => (
    Object.keys(data[productID])?.map(size => (
      data[productID][size]
    ))));
};

export const selectCountInCart = (state) => (state.cart.data == null || Object.keys(state.cart.data) === 0 ? 0
  : Object.keys(state.cart.data).reduce( (sum, product) => (sum + Object.keys(state.cart.data[product]).length), 0 ));
export default cartSlice.reducer;
