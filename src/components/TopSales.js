import React from "react";
import TopSalesItem from "./TopSalesItem";

export default function TopSales({ data, isLoading, isError, children }) {
  //console.log('isLoading', isLoading);
  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      { children }
      { data &&
        <div className="row">
          {data.map(item => <TopSalesItem item={ item } key={ item.id } />) }
        </div>
      }
    </section>
  );
};