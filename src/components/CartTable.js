import React from "react";
import CartTableItem from "./CartTableItem";

function calcSum(items, prop) {
  return items.reduce((a, b) => (a + b[prop]), 0);
};

export default function CartTable({ items }) {
  if (!items) return null;
  console.log('CartTable', items);

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Название</th>
          <th scope="col">Размер</th>
          <th scope="col">Кол-во</th>
          <th scope="col">Стоимость</th>
          <th scope="col">Итого</th>
          <th scope="col">Действия</th>
        </tr>
      </thead>
      <tbody>
        { items?.map((item, index) => <CartTableItem key={ item.id } item={ item } index={ index } />) }
        <tr>
          <td colSpan="5" className="text-right">Общая стоимость</td>
          <td>{ calcSum(items, "price") } руб.</td>
        </tr>
      </tbody>
    </table>
  );
};