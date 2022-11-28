import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCountInCart } from "../features/cart/cartSlice";

export default function HeaderCart() {
  const productCount = useSelector(selectCountInCart);

  return (
    <Link to="/cart" >
    <div className="header-controls-pic header-controls-cart">
      { (productCount > 0) && <div className="header-controls-cart-full">{productCount}</div> }
    </div>
    </Link>
  );
}; // <div className="header-controls-cart-menu"></div>