import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './slices/counterSlice';
import { recipesApi } from './services/recipes';

export const store = configureStore({
  reducer: {
    counterSlice: counterSlice,
    [recipesApi.reducerPath]: recipesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recipesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
