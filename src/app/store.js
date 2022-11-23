import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import topSalesReducer from '../features/topSales/topSalesSlice';
import { getTopSales, getTopSalesSuccess, getTopSalesFailure } from '../features/topSales/topSalesSlice';
import { fetchData } from '../api/api';

const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  actionCreator: getTopSales,
  effect: async (action, listenerApi) => {
    console.log('listenerMiddleware', action, action.payload);
    //listenerApi.cancelActiveListeners();
    try {
      const { url } = action.payload;
      const data = await fetchData(url);
      console.log('listenerMiddleware OK');
      listenerApi.dispatch(getTopSalesSuccess(data));
    } catch (error) {
      console.log('listenerMiddleware ERROR', error.message);
      listenerApi.dispatch(getTopSalesFailure(error.message));
    };

  },
});


export const store = configureStore({
  reducer: {
    topSales: topSalesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: true, thunk: false })
    .prepend(listenerMiddleware.middleware),
  devTools: process.env.NODE_ENV !== 'production'
});
