import React from "react";
import CartTable from "./CartTable";
import { Link } from "react-router-dom";
import useGetCart from "../hooks/useGetCart";

interface CartProps {
  children: React.ReactNode
};

export default function Cart({ children }: CartProps) {
  const items = useGetCart();

  console.log('Cart data = ', items);

  if (items == null || Object.keys(items).length === 0) {
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
        <CartTable items={items} />
        { children }
    </section>
  );
};