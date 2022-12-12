import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { topSalesItem, categoryItem, catalogItems } from "../../types/types";
import { categoryAllOption } from '../../features/category/categorySlice';


interface getCatalogArgs {
  categoryId?: number,
  offset?: number
};

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  endpoints: (build) => ({
    getTopSales: build.query<topSalesItem[], void>({
      query: () => 'top-sales',
    }),
    getCategoryList: build.query<categoryItem[], void>({
      query: (args) => 'categories',
      transformResponse: (response: categoryItem[]) => [categoryAllOption].concat(response),
    }),
    getCatalog: build.query<catalogItems, getCatalogArgs>({
      query: (args) => ({url: 'items', params: args}),
    }),
  }),
})

export const { useGetTopSalesQuery, useGetCategoryListQuery, useGetCatalogQuery } = shopApi;