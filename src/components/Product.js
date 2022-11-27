// Represents a detailed product (aka 'catalog item') description (for product page)

import React from "react";
import ProductSizeList from "./ProductSizeList";

export default function Product({ data, isLoading, children }) {
  //if (isLoading) return <Loader />;
  //if (data == null) return null;

  console.log('Product', data, isLoading);
  return (
    <section className="catalog-item">
      { children }
      { data &&
      <>
        <h2 className="text-center">{data.title}</h2>
        <div className="row">
          <div className="col-5">
            <img
              src={data.images[0]}
              className="img-fluid"
              alt={data.title}
              />
          </div>
          <div className="col-7">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>Артикул</td>
                  <td>{data.sku}</td>
                </tr>
                <tr>
                  <td>Производитель</td>
                  <td>{data.manufacturer}</td>
                </tr>
                <tr>
                  <td>Цвет</td>
                  <td>{data.color}</td>
                </tr>
                <tr>
                  <td>Материалы</td>
                  <td>{data.material}</td>
                </tr>
                <tr>
                  <td>Сезон</td>
                  <td>{data.season}</td>
                </tr>
                <tr>
                  <td>Повод</td>
                  <td>{data.reason}</td>
                </tr>
              </tbody>
            </table>
            <ProductSizeList sizes={ data.sizes } />
          </div>
        </div>
      </>
      }
    </section>
  );
};
