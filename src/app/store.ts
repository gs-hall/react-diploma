import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import catalogReducer from '../features/catalog/catalogSlice';
// @ts-ignore
import cartReducer from '../features/cart/cartSlice.ts';
// @ts-ignore
import orderReducer, { actionPostOrder, effectPostOrder } from '../features/order/orderSlice';
import { shopApi } from './services/shopApi';

const listenerMiddleware = createListenerMiddleware()
listenerMiddleware.startListening({
  actionCreator: actionPostOrder,
  effect: effectPostOrder
});

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    cart: cartReducer,
    order: orderReducer,
    [shopApi.reducerPath]: shopApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .prepend(listenerMiddleware.middleware)
    .prepend(shopApi.middleware),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;