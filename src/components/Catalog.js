import React from "react"
import CatalogItem from "./CatalogItem";

export default function Catalog({ data, isLoading, isError, children }) {
  return (
    <section className="catalog">
    <h2 className="text-center">Каталог</h2>
    { children }
      { data &&
        <div className="row">
          {data.map(item => <CatalogItem item={ item } key={ item.id } />) }
        </div>
      }
  </section>
  );
};