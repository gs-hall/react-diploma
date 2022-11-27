import { createSlice } from '@reduxjs/toolkit';
import { effectFetchData } from '../../api/api';

const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  isReloadRequired: true
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    actionGetProduct: (state, action) => {
      console.log('actionGetProduct', action.payload);
      state.isLoading = true;
      state.isError = false;
      state.isReloadRequired = false;
    },
    actionProductLoaded: (state, action) => {
      console.log('actionProductLoaded', action.payload);
      state.data = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.isReloadRequired = false;
    },    
    actionProductLoadFailed: (state, action) => {
      console.log('actionProductLoadFailed', action.payload);
      state.isLoading = false;
      state.isError = action.payload;
      state.isReloadRequired = false;
    },
    actionReloadProduct: (state) => {
      console.log('actionReloadProduct');
      state.isReloadRequired = true;
    }
}});

export const { actionGetProduct, actionProductLoaded, actionProductLoadFailed, actionReloadProduct } = productSlice.actions;
export const selectProduct = (state) => state.product;

export default productSlice.reducer;

export async function effectGetProduct(action, listenerApi) {
  console.log('effectGetProduct', action.payload);
  const { itemID } = action.payload;

  await effectFetchData({
    action,
    listenerApi,
    url: `${process.env.REACT_APP_CATALOG_URL}/${itemID}`,
    successAction: actionProductLoaded,
    failureAction: actionProductLoadFailed
  });
};
