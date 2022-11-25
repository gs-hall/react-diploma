import React from "react"
import Banner from "../components/Banner";
import TopSales from "../components/TopSales";
import { withRedux } from "../hoc/withRedux";
import { selectTopSales, actionGetTopSales, actionReloadTopSales } from "../features/topSales/topSalesSlice";
import { selectCatalog, actionGetCatalog, actionReloadCatalog } from "../features/catalog/catalogSlice";
import { selectCategory, actionGetCategory, actionReloadCategory, actionSetActive } from "../features/category/categorySlice";
import Catalog from "../components/Catalog";
import CategoryList from "../components/CategoryList";

export default function Main() {
  const TopSalesWithRedux = withRedux({
    WrappedComponent: TopSales,
    selector: selectTopSales,
    fetchAction: actionGetTopSales,
    fetchUrl: process.env.REACT_APP_TOP_SALES_URL,
    reloadAction: actionReloadTopSales
  });
  const CatalogWithRedux = withRedux({
    WrappedComponent: Catalog,
    selector: selectCatalog,
    fetchAction: actionGetCatalog,
    fetchUrl: process.env.REACT_APP_CATALOG_URL,
    reloadAction: actionReloadCatalog
  });
  const CategoryListWithRedux = withRedux({
    WrappedComponent: CategoryList,
    selector: selectCategory,
    fetchAction: actionGetCategory,
    fetchUrl: process.env.REACT_APP_CATEGORY_URL,
    reloadAction: actionReloadCategory,
    setActiveAction: actionSetActive
  });  
  

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <Banner />
          <TopSalesWithRedux />
          <CatalogWithRedux>
            <CategoryListWithRedux />
          </CatalogWithRedux>
        </div>
      </div>
    </main>
  );
};