import React from "react"
import Banner from "../components/Banner";
import CatalogSearch from "../components/CatalogSearch";
import catalogFactory from "../features/catalog/catalogFactory";
import categoryListFactory from "../features/category/categoryListFactory";

export default function Catalog() {
  const Catalog = catalogFactory();
  const CategoryList = categoryListFactory();

  return (
    <>
      <Banner />
      <Catalog>
        <CategoryList />
        <CatalogSearch />
      </Catalog>
    </>
  );
};