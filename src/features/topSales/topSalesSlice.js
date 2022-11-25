import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from '../../api/api';

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
      console.log('actionGetTopSales', action.payload);
      state.isLoading = true;
      state.isError = false;
      state.isReloadRequired = false;
    },
    actionTopSalesLoaded: (state, action) => {
      console.log('actionTopSalesLoaded', action.payload);
      state.data = action.payload;
      state.isLoading = false;
      state.isError = false;
    },    
    actionTopSalesLoadFailed: (state, action) => {
      console.log('actionTopSalesLoadFailed', action.payload);
      state.isLoading = false;
      state.isError = action.payload;
    },
    actionReloadTopSales: (state) => {
      console.log('actionReloadTopSales');
      state.isReloadRequired = true;
    }    
  }
});

export const { actionGetTopSales, actionTopSalesLoaded, actionTopSalesLoadFailed, actionReloadTopSales } = topSalesSlice.actions;
export const selectTopSales = (state) => state.topSales;
export default topSalesSlice.reducer;

export const effectGetTopSales = async (action, listenerApi) => {
  console.log('effectGetTopSales', action, action.payload);
  try {
    const { url } = action.payload;
    const data = await fetchData(url);
    await listenerApi.delay(2000);
    console.log('effectGetTopSales OK');
    listenerApi.dispatch(actionTopSalesLoaded(data));
  } catch (error) {
    console.log('effectGetTopSales ERROR', error.message);
    listenerApi.dispatch(actionTopSalesLoadFailed(error.message));
  };
};
