// Represents a detailed product (aka 'catalog item') description (for product page)

import React from "react";
import ProductSizeList from "./ProductSizeList";

export default function Product(props) {
  if (!props.data) return props.children;

  const { id, title, images, sku, manufacturer, color, material, season, reason, price, sizes } = props.data;

  return (
    <section className="catalog-item">
      { props.children }
      { title &&
      <>
        <h2 className="text-center">{title}</h2>
        <div className="row">
          <div className="col-5">
            <img
              src={images[0]}
              className="img-fluid"
              alt={title}
              />
          </div>
          <div className="col-7">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>Артикул</td>
                  <td>{sku}</td>
                </tr>
                <tr>
                  <td>Производитель</td>
                  <td>{manufacturer}</td>
                </tr>
                <tr>
                  <td>Цвет</td>
                  <td>{color}</td>
                </tr>
                <tr>
                  <td>Материалы</td>
                  <td>{material}</td>
                </tr>
                <tr>
                  <td>Сезон</td>
                  <td>{season}</td>
                </tr>
                <tr>
                  <td>Повод</td>
                  <td>{reason}</td>
                </tr>
              </tbody>
            </table>
            <ProductSizeList product={{ id, title, price, sizes }} />
          </div>
        </div>
      </>
      }
    </section>
  );
};
