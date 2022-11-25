import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import topSalesReducer, { actionGetTopSales, effectGetTopSales } from '../features/topSales/topSalesSlice';
import catalogReducer, { actionGetCatalog, effectGetCatalog } from '../features/catalog/catalogSlice';
import categoryReducer, { actionGetCategory, effectGetCategory } from '../features/category/categorySlice';

const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  actionCreator: actionGetTopSales,
  effect: effectGetTopSales
});

listenerMiddleware.startListening({
  actionCreator: actionGetCatalog,
  effect: effectGetCatalog
});

listenerMiddleware.startListening({
  actionCreator: actionGetCategory,
  effect: effectGetCategory
});

export const store = configureStore({
  reducer: {
    topSales: topSalesReducer,
    catalog: catalogReducer,
    category: categoryReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true,
      thunk: false
    })
    .prepend(listenerMiddleware.middleware),
  devTools: process.env.NODE_ENV !== 'production'
});
