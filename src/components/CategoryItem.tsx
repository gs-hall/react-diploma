import classnames from "classnames";
import React, { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

interface CategoryItemProps {
  title: string;
  isActive: boolean;
  onClick: MouseEventHandler;
};

export default function CategoryItem({ title, isActive, onClick }: CategoryItemProps) {
  return (
    <li className="nav-item">
      <Link to="" className={ classnames("nav-link", { "active": isActive }) } onClick={ onClick } >{ title }</Link>
    </li>
  );
};