import classnames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

export default function CategoryItem({ item, isActive, onClick }) {
  return (
    <li className="nav-item">
      <Link className={ classnames("nav-link", { "active": isActive }) } onClick={ onClick } >{ item?.title }</Link>
    </li>
  );
};