import React from "react"

export default function Cart() {
  const productCount = 111;

  return (
    <div className="header-controls-pic header-controls-cart">
      <div className="header-controls-cart-full">{productCount}</div>
      <div className="header-controls-cart-menu"></div>
    </div>
  );
};