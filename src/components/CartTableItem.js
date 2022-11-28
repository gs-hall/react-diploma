import React from "react"
import { Link } from "react-router-dom";

export default function CartTableItem({ item, index }) {
  return (
    <tr>
      <td>{index}</td>
      <td><Link to={`/products/{item.id}`}>{item.title}</Link></td>
      <td>{item.size}</td>
      <td>{item.count}</td>
      <td>{item.price}</td>
      <td>{item.count * item.price}</td>
      <td>
        <button className="btn btn-outline-danger btn-sm">Удалить</button>
      </td>
    </tr>
  );
};