import React from "react";
import Cart from "../components/Cart";
import orderFactory from "../features/order/orderFactory";

export default function CartPage() {
  const OrderWithLocalStorage = orderFactory();

  return (
    <Cart>
      <OrderWithLocalStorage />
    </Cart>
  );
};