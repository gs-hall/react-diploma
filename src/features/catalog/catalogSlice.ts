import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { catalogItems, categoryItem, FixMeLater } from '../../types/types';

interface catalogStateProps {
  data: catalogItems | null,
  offset: number,
  activeCategoryID: number,
  search: string,
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
  search: ''
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
    setSearchCatalog:  (state, action) => {
      //console.log('setSearchCatalog', action.payload);
      if (state.search !== '' && action.payload ==='') { // cleared search
        state.data = [];
        //state.params.q = '';
        //state.params.offset = 0;
      };
      state.search = action.payload;
    },
    startSearchCatalog:  (state, action) => {
      //console.log('setSearchCatalog');
      //state.params.q = state.search;
      state.data = [];
    },
  }
});

export const { setActiveCategory, setCatalogData, increaseCatalogOffset, addCatalogData, setSearchCatalog, startSearchCatalog } = catalogSlice.actions;
export const selectActiveCategoryID = (state: FixMeLater) => state.catalog.activeCategoryID;
export const selectCatalogOffset = (state: FixMeLater) => state.catalog.offset;
export const selectCatalogData = (state: FixMeLater) => state.catalog.data;
export const selectCatalog = (state: FixMeLater) => state.catalog;
export const selectSearchCatalog = (state: FixMeLater) => state.catalog.search;
export default catalogSlice.reducer;
/*
export async function effectGetCatalog(action, listenerApi) {
  //console.log('effectGetCatalog', action.payload);
  const { params } = action.payload;

  await effectFetchData({
    listenerApi,
    url: process.env.REACT_APP_CATALOG_URL,
    params,
    successAction: actionCatalogLoaded,
    failureAction: actionCatalogLoadFailed
  });
};
*/
