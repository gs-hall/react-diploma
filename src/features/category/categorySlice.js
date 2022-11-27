import { createSlice } from '@reduxjs/toolkit';
import { effectFetchData } from '../../api/api';
import { actionAddCatalogParams } from '../catalog/catalogSlice';

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
      state.data = null;
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
    actionSetActiveCategory: (state, action) => {
      console.log('actionSetActiveCategory', action.payload);
      state.activeItemID = action.payload.activeItemID;
    },

  }
});

export const { actionGetCategory, actionCategoryLoaded, actionCategoryLoadFailed, actionReloadCategory, actionSetActiveCategory } = categorySlice.actions;
export const selectCategory = (state) => state.category;
export default categorySlice.reducer;

export async function effectGetCategory(action, listenerApi) {
  console.log('effectGetCategory', action, action.payload);
  await effectFetchData({
    action,
    listenerApi,
    url: process.env.REACT_APP_CATEGORY_URL,
    successAction: actionCategoryLoaded,
    failureAction: actionCategoryLoadFailed
  });
};

export async function effectSetActiveCategory(action, listenerApi) {
  console.log('effectSetActiveCategory', action.payload);
  listenerApi.dispatch(actionAddCatalogParams({ categoryId: action.payload.activeItemID }));
};
