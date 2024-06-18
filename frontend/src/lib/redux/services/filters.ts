import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { paths } from '../../../types/backend/backend';

export const BASE_URL = process.env.REACT_APP_API_URL;

export const filtersApi = createApi({
  reducerPath: 'filtersApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCuisines: builder.query<
      paths['/cuisines']['get']['responses']['200']['content']['application/json'],
      void
    >({
      query: () => '/cuisines',
    }),
    getDifficulties: builder.query<
      paths['/difficulties']['get']['responses']['200']['content']['application/json'],
      void
    >({
      query: () => '/difficulties',
    }),
    getDiets: builder.query<
      paths['/diets']['get']['responses']['200']['content']['application/json'],
      void
    >({
      query: () => '/diets',
    }),
  }),
});

export const {
  useGetCuisinesQuery,
  useGetDifficultiesQuery,
  useGetDietsQuery,
} = filtersApi;
