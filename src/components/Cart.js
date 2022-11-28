import React from "react";
import { selectCart, setCartData, localStorageCartKey } from "../features/cart/cartSlice";
import CartTable from "./CartTable";
import { Link } from "react-router-dom";
import useGetFromLocalStorage from "../hooks/useGetFromLocalStorage";

export default function Cart(props) {
  const data = props.data;
  //const { data } = useGetFromLocalStorage(selectCart, setCartData, localStorageCartKey);
  console.log('Cart props = ', props);

  if (data == null || data?.items?.length === 0) {
    return <h5 className="text-center">Корзина пуста, Вы можете найти подходящие товары в <Link to="/catalog">каталоге</Link></h5>;
  };

  return (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
        <CartTable items={ data } />
        { props.children }
    </section>
  );
};