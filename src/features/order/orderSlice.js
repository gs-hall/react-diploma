import { createSlice } from '@reduxjs/toolkit';
import { effectPostData } from '../../api/api';

export const localStorageOrderKey = 'order';

const initialState = {
  data: null,
  isLoading: false,
  isError: false
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    actionPostOrder: (state, action) => {
      console.log('actionPostOrder', action.payload);
      const { order } = action.payload;
      state.data = order;
      state.isLoading = true;
      state.isError = false;
      localStorage.setItem(localStorageOrderKey, JSON.stringify(order));
    },
    actionOrderPosted: (state, action) => {
      console.log('actionOrderPosted');
      state.data = null;
      state.isLoading = false;
      state.isError = false;
      localStorage.removeItem(localStorageOrderKey);
    },
    actionOrderPostFailed: (state, action) => {
      console.log('actionOrderPostFailed', action.payload);
      state.isLoading = false;
      state.isError = true;
      state.isReloadRequired = false;
    }
}});

export const { actionPostOrder, actionOrderPosted, actionOrderPostFailed } = orderSlice.actions;
export const selectOrder = (state) => state.order;

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
};
