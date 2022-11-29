import React from "react";
import Cart from "../components/Cart";
import Order from "../components/Order";
import cartFactory from "../features/cart/cartFactory";

export default function CartPage() {
  const CartWithLocalStorage = cartFactory({ WrappedComponent: Cart });

  return (
    <CartWithLocalStorage>
      <Order />
    </CartWithLocalStorage>
  );
};