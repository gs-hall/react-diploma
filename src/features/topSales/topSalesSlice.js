import { createSlice } from '@reduxjs/toolkit';
import { effectFetchData } from '../../api/api';

const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  isReloadRequired: true
};

export const topSalesSlice = createSlice({
  name: 'topSales',
  initialState,
  reducers: {
    actionGetTopSales: (state, action) => {
      //console.log('actionGetTopSales', action.payload);
      state.isLoading = true;
      state.isError = false;
      state.isReloadRequired = false;
    },
    actionTopSalesLoaded: (state, action) => {
      //console.log('actionTopSalesLoaded', action.payload);
      state.data = action.payload;
      state.isLoading = false;
      state.isError = false;
    },
    actionTopSalesLoadFailed: (state, action) => {
      //console.log('actionTopSalesLoadFailed', action.payload);
      state.isLoading = false;
      state.isError = action.payload;
    },
    actionReloadTopSales: (state) => {
      //console.log('actionReloadTopSales');
      state.isReloadRequired = true;
    }
  }
});

export const { actionGetTopSales, actionTopSalesLoaded, actionTopSalesLoadFailed, actionReloadTopSales } = topSalesSlice.actions;
export const selectTopSales = (state) => state.topSales;
export default topSalesSlice.reducer;

export async function effectGetTopSales(action, listenerApi) {
  await effectFetchData({
    listenerApi,
    url: process.env.REACT_APP_TOP_SALES_URL,
    successAction: actionTopSalesLoaded,
    failureAction: actionTopSalesLoadFailed
  });
};

