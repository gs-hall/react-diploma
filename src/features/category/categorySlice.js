import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from '../../api/api';

const allOption = {
  "id":0,
  "title":"Все"
};

const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  isReloadRequired: true,
  activeItemID: allOption.id
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    actionGetCategory: (state, action) => {
      console.log('actionGetCategory', action.payload);
      state.isLoading = true;
      state.isError = false;
      state.isReloadRequired = false;
    },
    actionCategoryLoaded: (state, action) => {
      console.log('actionCategoryLoaded', action.payload);
      const items = action.payload;
      items.unshift(allOption);
      state.data = items;
      state.isLoading = false;
      state.isError = false;
    },    
    actionCategoryLoadFailed: (state, action) => {
      console.log('actionCategoryLoadFailed', action.payload);
      state.isLoading = false;
      state.isError = action.payload;
    },
    actionReloadCategory: (state) => {
      console.log('actionReloadCategory');
      state.isReloadRequired = true;
    },
    actionSetActive: (state, action) => {
      console.log('actionSetActive', action.payload);
      state.activeItemID = action.payload;
    },

  }
});

export const { actionGetCategory, actionCategoryLoaded, actionCategoryLoadFailed, actionReloadCategory, actionSetActive } = categorySlice.actions;
export const selectCategory = (state) => state.category;
export default categorySlice.reducer;

export const effectGetCategory = async (action, listenerApi) => {
  console.log('effectGetCategory', action, action.payload);
  try {
    const { url } = action.payload;
    const data = await fetchData(url);
    await listenerApi.delay(1000);
    console.log('effectGetCategory OK');
    listenerApi.dispatch(actionCategoryLoaded(data));
  } catch (error) {
    console.log('effectGetCategory ERROR', error.message);
    listenerApi.dispatch(actionCategoryLoadFailed(error.message));
  };
};


