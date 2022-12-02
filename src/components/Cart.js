import React from "react";
import CartTable from "./CartTable";
import { Link } from "react-router-dom";

export default function Cart({ data, children, ...rest}) {
  //console.log('Cart data = ', data);

  if (data == null || Object.keys(data).length === 0) {
    return (
      <>
        <br/><br/>
        <h5 className="text-center">Корзина пуста, Вы можете найти подходящие товары в <Link to="/catalog">каталоге</Link></h5>
        <br/><br/>
      </>
    );
  };

  return (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
        <CartTable items={ data } { ...rest } />
        { children }
    </section>
  );
};