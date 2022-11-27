import React from "react"

export default function SizeList({ sizes, activeItemID, actions }) {
  if (sizes === null) return;
  return (
    <>
      <div className="text-center">
        <p>Размеры в наличии:&nbsp;
          {sizes.filter(x => (x.available)).map((item, index) => (
            <span className="catalog-item-size">{item.size}</span>
          ))}
        </p>
        <p>Количество:
          <span className="btn-group btn-group-sm pl-2">
            <button className="btn btn-secondary">-</button>
            <span className="btn btn-outline-primary">1</span>
            <button className="btn btn-secondary">+</button>
          </span>
        </p>
      </div>
      <button className="btn btn-danger btn-block btn-lg">В корзину</button>
    </>
  );
};
/*
              <span className="catalog-item-size selected">18 US</span>
              <span className="catalog-item-size">20 US</span>
*/