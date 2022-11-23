import React from "react"
import Banner from "../components/Banner";
import useFetch from "../hooks/useFetch";
import { selectTopSales, getTopSales } from "../features/topSales/topSalesSlice";

export default function Main() {
  useFetch(selectTopSales, getTopSales, process.env.REACT_APP_TOP_SALES_URL);

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner />
          <section className="top-sales">
            <h2 className="text-center">Хиты продаж!</h2>
            <div className="preloader">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </section>
          <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            <div className="preloader">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};