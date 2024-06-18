import { configureStore } from '@reduxjs/toolkit';
import { recipesApi } from './services/recipes';
import searchSlice from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    searchSlice: searchSlice,
    [recipesApi.reducerPath]: recipesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recipesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
