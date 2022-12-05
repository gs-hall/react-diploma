import { createSlice } from '@reduxjs/toolkit';
import { effectPostData } from '../../api/api';

export const localStorageOrderKey = 'order';

const initialState = {
  data: {
    phone: '',
    address: '',
    agreement: false
  },
  isLoading: false,
  isError: false
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    actionPostOrder: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    actionOrderPosted: () => { // order was successfully posted
      console.log('actionOrderPosted');
      localStorage.removeItem(localStorageOrderKey);
      return initialState;
    },
    actionOrderPostFailed: (state, action) => {
      console.log('actionOrderPostFailed', action.payload);
      state.isLoading = false;
      state.isError = true;
      state.isReloadRequired = false;
    },
    setOrderData: (state, action) => {
      console.log('setOrderData', action.payload);
      state.data = action.payload;
    },
}});

export const { actionPostOrder, actionOrderPosted, actionOrderPostFailed, setOrderData } = orderSlice.actions;
export const selectOrderData = (state) => state.order.data;

export default orderSlice.reducer;

export async function effectPostOrder(action, listenerApi) {
  console.log('effectPostOrder', action.payload);
  const { order } = action.payload;

  await effectPostData({
    action,
    listenerApi,
    url: process.env.REACT_APP_ORDER_URL,
    data: order,
    successAction: actionOrderPosted,
    failureAction: actionOrderPostFailed
  });
  localStorage.setItem(localStorageOrderKey, JSON.stringify(order));
};
