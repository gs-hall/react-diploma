import { createSlice } from '@reduxjs/toolkit';

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
    getTopSales: (state, action) => {
      console.log('getTopSales', action.payload);
      state.isLoading = true;
      state.isError = false;
      state.isReloadRequired = false;
    },
    getTopSalesSuccess: (state, action) => {
      console.log('getTopSalesSuccess', action.payload);
      state.data = action.payload;
      state.isLoading = false;
      state.isError = false;
    },    
    getTopSalesFailure: (state, action) => {
      console.log('getTopSalesFailure', action.payload);
      state.isLoading = false;
      state.isError = action.payload;
    },
    reloadTopSales: (state) => {
      console.log('reloadTopSales');
      state.isReloadRequired = true;
    }    
  }
});

export const { getTopSales, getTopSalesSuccess, getTopSalesFailure, reloadTopSales } = topSalesSlice.actions;

export const selectTopSales = (state) => state.topSales;

export default topSalesSlice.reducer;
