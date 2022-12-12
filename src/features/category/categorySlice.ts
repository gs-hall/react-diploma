import { createSlice } from '@reduxjs/toolkit';
//import { effectFetchData } from '../../api/api';
//import { actionAddCatalogParams } from '../catalog/catalogSlice';
import { categoryItem, FixMeLater } from "../../types/types";

export const categoryAllOption: categoryItem = {
  id: 0,
  title: "Все"
};

const initialState = {
  activeCategoryID: categoryAllOption.id
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    actionSetActiveCategory: (state, action) => {
      console.log('actionSetActiveCategory', action.payload);
      state.activeCategoryID = action.payload.activeCategoryID;
    },

  }
});

export const { actionSetActiveCategory } = categorySlice.actions;
export const selectActiveCategory = (state: FixMeLater) => state.category.activeCategoryID;
export default categorySlice.reducer;

/*
export async function effectSetActiveCategory(action, listenerApi) {
  console.log('effectSetActiveCategory', action.payload);
  listenerApi.dispatch(actionAddCatalogParams({ categoryId: action.payload.activeItemID }));
};
*/
