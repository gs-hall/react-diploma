import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { catalogItems, categoryItem, FixMeLater } from '../../types/types';

interface catalogStateProps {
  data: catalogItems | null,
  offset: number,
  activeCategoryID: number,
  searchText: string,
  searchParam: string,
  lastLoadedItemCount: number | null
};

interface setActiveCategoryPayload {
  activeCategoryID: number
};

interface setCatalogDataPayload {
  data: catalogItems
};

interface increaseCatalogOffsetPayload {
  loadMoreCount: number
};

interface searchCatalogPayload {
  search: string
};

const mergeData = (a: catalogItems, b: catalogItems) => {
  const ids = new Set(a.map(x => x.id));
  const n = b.filter(x => !ids.has(x.id));
  return a.concat(n);
};

export const categoryAllOption: categoryItem = {
  id: 0,
  title: "Все"
};

const initialState: catalogStateProps = {
  data: null,
  offset: 0,
  lastLoadedItemCount: null,
  activeCategoryID: categoryAllOption.id,
  searchText: '', // for displaying
  searchParam: '' // for API
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<setActiveCategoryPayload>) => {
      console.log('actionSetActiveCategory', action.payload);
      state.activeCategoryID = action.payload.activeCategoryID;
      state.data = [];
      state.offset = 0;
    },
    setCatalogData: (state, action: PayloadAction<setCatalogDataPayload>) => {
      console.log('setCatalogData', action.payload);
      state.data = action.payload.data;
      state.lastLoadedItemCount = action.payload.data?.length;
    },
    addCatalogData: (state, action: PayloadAction<setCatalogDataPayload>) => {
      console.log('setCatalogData', action.payload);
      state.data = mergeData(state.data || [], action.payload.data);
      state.lastLoadedItemCount = action.payload.data?.length;
    },
    increaseCatalogOffset: (state, action: PayloadAction<increaseCatalogOffsetPayload>) => {
      console.log('increaseCatalogOffset', action.payload);
      state.offset += action.payload.loadMoreCount;
    },
    setCatalogSearchText:  (state, action: PayloadAction<searchCatalogPayload>) => {
      //console.log('setSearchCatalog', action.payload);
      if (state.searchText !== '' && action.payload.search ==='') { // cleared search
        state.data = [];
        state.searchParam = '';
        state.offset = 0;
      };
      state.searchText = action.payload.search;
    },
    searchCatalog: (state) => {
      if (state.searchParam !== state.searchText) { // search changed
        state.data = [];
        state.searchParam = state.searchText;
      };
    },
  }
});

export const { setActiveCategory, setCatalogData, increaseCatalogOffset, addCatalogData, setCatalogSearchText, searchCatalog } = catalogSlice.actions;
export const selectActiveCategoryID = (state: FixMeLater) => state.catalog.activeCategoryID;
export const selectCatalogOffset = (state: FixMeLater) => state.catalog.offset;
export const selectCatalogData = (state: FixMeLater) => state.catalog.data;
export const selectCatalog = (state: FixMeLater) => state.catalog;
export const selectCatalogSearchText = (state: FixMeLater) => state.catalog.searchText;
export const selectCatalogSearchParam = (state: FixMeLater) => state.catalog.searchParam;
export default catalogSlice.reducer;
