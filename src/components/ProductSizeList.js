import classNames from "classnames";
import React, { useState } from "react"

export default function SizeList({ sizes, activeItemID, actions }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [count, setCount] = useState(1);

  const handlePutToCart = () => {
    console.log('handlePutToCart', selectedSize, count);
  };

  const handleChangeCount = (newCount) => {
    console.log('handleChangeCount', newCount);
    if (!selectedSize || newCount<1 || newCount>10) return;
    setCount(newCount);
  };

  const handleSelectSize = (newSize) => {
    console.log('handleSelectSize', newSize);
    setSelectedSize(newSize);
    setCount(1);
  };

  if (sizes === null) return;
  const availableSizes = sizes.filter(x => (x.available));
  if (availableSizes.length === 0) return <p>Нет в наличии</p>;

  return (
    <>
      <div className="text-center">
        <p>Размеры в наличии:&nbsp;
          {availableSizes.map(item => (
            <span
              key={ item.size }
              className={ classNames("catalog-item-size", { "selected": selectedSize === item.size}) }
              onClick = { () => handleSelectSize(item.size) }
              >
              { item.size }
            </span>
          ))}
        </p>
        { selectedSize &&
        <p>Количество:
          <span className="btn-group btn-group-sm pl-2">
            <button className="btn btn-secondary" onClick={() => handleChangeCount(count-1)} >-</button>
            <span className="btn btn-outline-primary">{count}</span>
            <button className="btn btn-secondary" onClick={() => handleChangeCount(count+1)}>+</button>
          </span>
        </p>
        }
      </div>
      <button className="btn btn-danger btn-block btn-lg" onClick={ handlePutToCart } disabled={ selectedSize == null } >В корзину</button>
    </>
  );
};
