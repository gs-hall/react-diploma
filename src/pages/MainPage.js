import React from "react"
import Banner from "../components/Banner";
import CategoryList from "../components/CategoryList";
import catalogFactory from "../features/catalog/catalogFactory";
//import categoryListFactory from "../features/category/categoryListFactory";
import TopSales from "../components/TopSales";

export default function Main() {
  const Catalog = catalogFactory();
  //const CategoryList = categoryListFactory();

  return (
    <>
      <Banner />
      <TopSales />
      <Catalog>
        <CategoryList />
      </Catalog>
    </>
  );
};

