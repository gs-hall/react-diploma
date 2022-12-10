import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { topSalesItem, categoryItem } from "../../types/types";

export const categoryAllOption: categoryItem = {
  id: 0,
  title: "Все"
};

/*
interface getCatalogArgs {
  categoryId: number
};
query: (args) => ({url: 'categories', params: args}),
*/

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  //tagTypes: ['CategoryList'],
  endpoints: (build) => ({
    getTopSales: build.query<topSalesItem[], void>({
      query: () => 'top-sales',
    }),
    getCategoryList: build.query<categoryItem[], void>({
      query: (args) => 'categories',
      transformResponse: (response: categoryItem[]) => [categoryAllOption].concat(response),
      //providesTags: ['CategoryList']
    }),
  }),
})

export const { useGetTopSalesQuery, useGetCategoryListQuery } = shopApi;