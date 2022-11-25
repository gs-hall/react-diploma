import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from '../../api/api';

const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  isReloadRequired: true
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    actionGetCatalog: (state, action) => {
      console.log('actionGetCatalog', action.payload);
      state.isLoading = true;
      state.isError = false;
      state.isReloadRequired = false;
    },
    actionCatalogLoaded: (state, action) => {
      console.log('actionCatalogLoaded', action.payload);
      state.data = action.payload;
      state.isLoading = false;
      state.isError = false;
    },    
    actionCatalogLoadFailed: (state, action) => {
      console.log('actionCatalogLoadFailed', action.payload);
      state.isLoading = false;
      state.isError = action.payload;
    },
    actionReloadCatalog: (state) => {
      console.log('actionReloadCatalog');
      state.isReloadRequired = true;
    }    
  }
});

export const { actionGetCatalog, actionCatalogLoaded, actionCatalogLoadFailed, actionReloadCatalog } = catalogSlice.actions;
export const selectCatalog = (state) => state.catalog;
export default catalogSlice.reducer;

export const effectGetCatalog = async (action, listenerApi) => {
  console.log('effectGetCatalog', action, action.payload);
  try {
    const { url } = action.payload;
    const data = await fetchData(url);
    await listenerApi.delay(2000);
    console.log('effectGetCatalog OK');
    listenerApi.dispatch(actionCatalogLoaded(data));
  } catch (error) {
    console.log('effectGetCatalog ERROR', error.message);
    listenerApi.dispatch(actionCatalogLoadFailed(error.message));
  };
};


