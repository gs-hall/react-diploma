import React from "react";
import { useDispatch } from "react-redux";
import CartTableItem from "./CartTableItem";
import { numberWithSpaces } from "../utils/formatNumbers";

// Calculates dot product of prices and counts
function calcDotProduct(items, prop1, prop2) {
  return items.reduce((a, b) => (a + b[prop1]*b[prop2]), 0);
};

export default function CartTable({ items, actions }) {
  const dispatch = useDispatch();

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
        { items?.map((item, index) =>
          <CartTableItem
            key={ item.id + item.size }
            item={ item }
            index={ index+1 }
            onDelete={ () => dispatch(actions.deleteItem({ id: item.id, size: item.size })) }
            />
        )}
        <tr>
          <td colSpan="5" className="text-right">Общая стоимость</td>
          <td>{ numberWithSpaces(calcDotProduct(items, "price", "count")) }&nbsp;руб.</td>
        </tr>
      </tbody>
    </table>
  );
};