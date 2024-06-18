import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GetRecipesQueryParams, Recipe } from '../../../types/types';
import { getRecipesQueryParams } from '../../../utils/getRecipesQueryParams';

interface searchSliceState {
  data: Recipe[];
  page: number;
  hasMore: boolean;
  userInput?: string;
  queryParams?: GetRecipesQueryParams;
  isLoading?: boolean;
}

const initialState: searchSliceState = {
  data: [],
  page: 1,
  hasMore: true,
  queryParams: getRecipesQueryParams(1),
  userInput: '',
  isLoading: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Recipe[]>) => {
      state.data = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    setUserInput: (state, action: PayloadAction<string>) => {
      state.userInput = action.payload;
    },
    setQueryParams: (state, action: PayloadAction<GetRecipesQueryParams>) => {
      state.queryParams = action.payload;
    },
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setData,
  setPage,
  setHasMore,
  setUserInput,
  setQueryParams,
  isLoading,
} = searchSlice.actions;
export default searchSlice.reducer;
