import React from "react";
import Cart from "../components/Cart";
import Order from "../components/Order";
import { selectCartData, setCartData, localStorageCartKey, getCartAsArray } from "../features/cart/cartSlice";
import { withLocalStorage } from "../hoc/withLocalStorage";

export default function CartPage() {
  const CartWithLocalStorage = withLocalStorage({
    WrappedComponent: Cart,
    selector: selectCartData,
    actions: {
      setData: setCartData,
    },
    localStorageKey: localStorageCartKey,
    dataTransformationFunction: getCartAsArray
  });
  return (
    <CartWithLocalStorage>
      <Order />
    </CartWithLocalStorage>
  );
};