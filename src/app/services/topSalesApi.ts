import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface topSalesItem {
  id: number;
  title: string;
  price: number;
  images: string[];
};

interface topSales {
  items: topSalesItem[]
};

export const topSalesApi = createApi({
  reducerPath: 'topSalesApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  endpoints: (build) => ({
    getTopSales: build.query<topSalesItem[], void>({
      query: () => 'top-sales',
    }),
  }),
})

export const { useGetTopSalesQuery } = topSalesApi;