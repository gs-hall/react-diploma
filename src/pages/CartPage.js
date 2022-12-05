import React from "react";
import Cart from "../components/Cart";
import orderFactory from "../features/order/orderFactory";
import cartFactory from "../features/cart/cartFactory";

export default function CartPage() {
  const CartWithLocalStorage = cartFactory(Cart);
  const OrderWithLocalStorage = orderFactory();

  return (
    <CartWithLocalStorage>
      <OrderWithLocalStorage />
    </CartWithLocalStorage>
  );
};