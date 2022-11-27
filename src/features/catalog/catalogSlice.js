import { createSlice } from '@reduxjs/toolkit';
import { effectFetchData } from '../../api/api';

const initialState = {
  data: null,
  isLoading: false,
  isError: false,
  isReloadRequired: true,
  params: {},
  search: ''
};

const mergeData = (a, b) => {
  const ids = new Set(a.map(x => x.id));
  const n = b.filter(x => !ids.has(x.id));
  return a.concat(n);
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
      state.lastLoadedItemCount = action.payload?.length;
      state.data = state.data === null ? action.payload : mergeData(state.data, action.payload);
      state.isLoading = false;
      state.isError = false;
      state.isReloadRequired = false;
    },    
    actionCatalogLoadFailed: (state, action) => {
      console.log('actionCatalogLoadFailed', action.payload);
      state.isLoading = false;
      state.isError = action.payload;
      state.isReloadRequired = false;
    },
    actionReloadCatalog: (state) => {
      console.log('actionReloadCatalog');
      state.isReloadRequired = true;
    },
    // chain of invocations:
    // actionAddCatalogParams => useEffect => actionGetCatalog => effectGetCatalog => effectFetchData => fetchData => actionCatalogLoaded
    actionAddCatalogParams: (state, action) => {
      console.log('actionAddCatalogParams', action.payload);
      state.params = {...state.params, ...action.payload};
      state.data = null; // remove all data e.g. if category was changed
      state.params.offset = 0; // reset offset
      state.isReloadRequired = true;
    },
    actionLoadMoreCatalog: (state, action) => {
      console.log('actionLoadMoreCatalog', action.payload);
      state.params.offset = (state.params?.offset || 0) + action.payload.count;
      state.isReloadRequired = true;
    },
    setSearchCatalog:  (state, action) => {
      console.log('setSearchCatalog', action.payload);
      if (state.search !== '' && action.payload ==='') { // cleared search
        state.data = null;
        state.params.q = '';
        state.params.offset = 0;
        state.isReloadRequired = true;
      };
      state.search = action.payload;
    },
    startSearchCatalog:  (state, action) => {
      console.log('setSearchCatalog');
      state.params.q = state.search;
      state.isReloadRequired = true;
      state.data = null;
    },    
  }
});

export const { actionGetCatalog, actionCatalogLoaded, actionCatalogLoadFailed, actionReloadCatalog, actionAddCatalogParams, actionLoadMoreCatalog,
  setSearchCatalog, startSearchCatalog } = catalogSlice.actions;
export const selectCatalog = (state) => state.catalog;
export const selectSearchCatalog = (state) => state.catalog.search;
export default catalogSlice.reducer;

export async function effectGetCatalog(action, listenerApi) {
  console.log('effectGetCatalog', action.payload);
  const { params } = action.payload;

  await effectFetchData({
    action,
    listenerApi,
    url: process.env.REACT_APP_CATALOG_URL,
    params,
    successAction: actionCatalogLoaded,
    failureAction: actionCatalogLoadFailed
  });
};
