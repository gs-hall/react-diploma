import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartData, CartItem, CartState, DeleteFromCartPayload, FixMeLater, Owner } from '../../../types/types';

const initialState: CartState = {
  data: null, // data[product][size] = { id, count, price, title, size }
  owner: {
    phone: '',
    address: '',
  }
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      //console.log('addToCart', action.payload);
      const { id:productID, title, price, size, count } = action.payload;
      if (state.data == null) {
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
    },

    setCart: (_, action: PayloadAction<CartState>) => {
      console.log('setCart action.payload=', action.payload);
      return action.payload;
    },

    deleteFromCart: (state, action: PayloadAction<DeleteFromCartPayload>) => {
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
      //saveDataToLocalStorage(state.data || {});
    },

    setOwnerData: (state, action: PayloadAction<Owner>) => {
      console.log('setOwnerData', action.payload);
      state.owner = action.payload;
    },

    postOrder: (state) => {
      console.log('postOrder');
    },
  }
});

export const selectCartData = (state: FixMeLater) => state.cart.data;

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

export const selectOwner = (state: any) => state.cart.owner;

export default cartSlice.reducer;

//export const { addToCart, setCart, deleteFromCart, setOwnerData, postOrder } = cartSlice.actions;
export const cartActions = cartSlice.actions;