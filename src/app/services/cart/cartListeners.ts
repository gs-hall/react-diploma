import { AnyAction, isAnyOf, Unsubscribe } from "@reduxjs/toolkit";
import { AppListenerEffectAPI, AppStartListening } from "../../store";
import { cartActions } from "./cartSlice";

export const localStorageCartKey = 'cart';

export async function saveCartToLocalStorage(action: AnyAction, listenerApi: AppListenerEffectAPI) {
  console.log('effectSaveCart listenerApi type = ', typeof listenerApi);
  const { cart } = listenerApi.getState();
  console.log('effectSaveCart state=', cart);
  localStorage.setItem(localStorageCartKey, JSON.stringify(cart));
};

export function setupCartListeners(
  startListening: AppStartListening
): Unsubscribe {
  const subscriptions = [
    startListening({
      matcher: isAnyOf(cartActions.addToCart, cartActions.deleteFromCart, cartActions.postOrder),
      effect: saveCartToLocalStorage
    })
  ];

  return () => {
    subscriptions.forEach((unsubscribe) => unsubscribe())
  }
};
