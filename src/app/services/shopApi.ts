import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TopSalesItem, CategoryItem, CatalogItems, ProductItem, GetCatalogArgs, Order } from "../../types/types";
import { categoryAllOption } from './catalog/catalogSlice';

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  endpoints: (build) => ({
    getTopSales: build.query<TopSalesItem[], void>({
      query: () => 'top-sales',
    }),
    getCategoryList: build.query<CategoryItem[], void>({
      query: () => 'categories',
      transformResponse: (response: CategoryItem[]) => [categoryAllOption].concat(response),
    }),
    getCatalog: build.query<CatalogItems, GetCatalogArgs>({
      query: (args) => ({url: 'items', params: args}),
    }),
    getProduct: build.query<ProductItem, number>({
      query: (id) => ({url: `items/${id}`}),
    }),
    postOrder: build.query<Order, void>({
      query: (id) => ({url: `items/${id}`}),
    }),
  }),
})

export const { useGetTopSalesQuery, useGetCategoryListQuery, useGetCatalogQuery, useGetProductQuery } = shopApi;