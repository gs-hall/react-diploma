import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import catalogReducer from '../features/catalog/catalogSlice';
import cartReducer, { addToCart, deleteFromCart, effectSaveCart, postOrder } from '../features/cart/cartSlice';
//import orderReducer from '../features/order/orderSlice';
import { shopApi } from './services/shopApi';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  //actionCreator: addToCart,
  matcher: isAnyOf(addToCart, deleteFromCart, postOrder),
  effect: effectSaveCart
});

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    cart: cartReducer,
    [shopApi.reducerPath]: shopApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .prepend(listenerMiddleware.middleware)
    .prepend(shopApi.middleware),
  devTools: process.env.NODE_ENV !== 'production'
});

//export type RootState = ReturnType<typeof store.getState>;