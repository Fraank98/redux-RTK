import { configureStore } from '@reduxjs/toolkit';
import { recipesApi } from './services/recipes';
import searchSlice from './slices/searchSlice';
import { filtersApi } from './services/filters';

export const store = configureStore({
  reducer: {
    searchSlice: searchSlice,
    [recipesApi.reducerPath]: recipesApi.reducer,
    [filtersApi.reducerPath]: filtersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(recipesApi.middleware)
      .concat(filtersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
