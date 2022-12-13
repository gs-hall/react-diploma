import { createSlice } from '@reduxjs/toolkit';
import { FixMeLater } from '../../types/types';

export const localStorageCartKey = 'cart';

type ProductID = number;
type Size = string;

interface Product {
  id: ProductID;
  count: number;
  price: number;
  title: string;
  size: Size;
};

interface ProductSize {
  [key: Size]: Product;
};

interface CartData {
  [key: ProductID]: ProductSize;
}

interface CartState {
  data: CartData | null
};

const initialState: CartState = {
  data: null // data[product][size] = { id, count, price, title, size }
};

function saveDataToLocalStorage(data: CartData) {
  localStorage.setItem(localStorageCartKey, JSON.stringify(data));
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      //console.log('addToCart', action.payload);
      const { id:productID, title, price, size, count } = action.payload;
      if (state.data === null) {
        state.data = {};
      };
      if (!state.data.hasOwnProperty(productID)) { // add product for the 1st time
        state.data[productID] = {};
      };
      if (state.data[productID].hasOwnProperty(size)) { // increase count
        state.data[productID][size].count += count;
      } else { // add product size
        state.data[productID][size] = { id: productID, title, price, size, count };
      };
      //console.log('addToCart result ', JSON.stringify(state.data));
      saveDataToLocalStorage(state.data);
    },

    setCartData: (state, action) => {
      console.log('setCartData action.payload=', action.payload);
      state.data = action.payload;
      //console.log('setCartData result ', JSON.stringify(state.data));
      //console.log('setCartData current ', current(state));
    },

    deleteFromCart: (state, action) => {
      //console.log('deleteFromCart', action.payload);
      const { id: productID, size } = action.payload;
      if (state.data) {
        delete state.data[productID][size];
        if (Object.keys(state.data[productID]).length === 0) { // no sizes left
          delete state.data[productID];
        };
      };
      //console.log('deleteFromCart result ', JSON.stringify(state.data));
      //console.log('deleteFromCart current ', current(state.data));
      saveDataToLocalStorage(state.data || {});
    },
  }
});

export const { addToCart, setCartData, deleteFromCart } = cartSlice.actions;

export const selectCartData = (state: FixMeLater) => state.cart.data;

/*/
export const getCartAsArray = (data: CartData) => { // convert to array
  if (data == null || Object.keys(data).length === 0) return null;
  console.log('getCartAsArray data = ', data);
  return Object.keys(data)?.flatMap((productID) => (
    Object.keys(data[Number(productID)])?.map(size => (
      data[Number(productID)][size]
    ))));
};
*/

const convertCartDataToArray = (data: CartData) => { // convert to array
  console.log('convertCartDataToArray data = ', data);
  if (data == null) return null;
  if (Object.keys(data).length === 0) return [];

  return Object.keys(data)?.flatMap((productID) => {
    console.log(' productID = ', productID, typeof productID);
    return Object.keys(data[Number(productID)])?.map(size => (
      data[Number(productID)][size]
    ))});
};

export const selectCountInCart = (state: FixMeLater) => (state.cart.data == null ? null
  : Object.keys(state.cart.data).length === 0 ? 0
  : Object.keys(state.cart.data).reduce( (sum, product) => (sum + Object.keys(state.cart.data[product]).length), 0 ));

export const selectCartDataAsArray = (state: FixMeLater) => convertCartDataToArray(state.cart.data);

export default cartSlice.reducer;
