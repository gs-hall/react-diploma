import React from "react";
import TopSalesItem from "./TopSalesItem";
import { useGetTopSalesQuery } from "../app/services/shopApi";
import Loader from "./Loader";
import Error from "./Error";

export default function TopSales() {
  const { data, error, isLoading, refetch } = useGetTopSalesQuery();
  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      { <Loader isLoading={isLoading} /> }
      { error && <Error message="Ошибка получения хитов продаж" refetch={refetch} isLoading={isLoading} /> }
      { data &&
        <div className="row">
          {data.map(item => <TopSalesItem item={item} key={item.id} />) }
        </div>
      }
    </section>
  );
};