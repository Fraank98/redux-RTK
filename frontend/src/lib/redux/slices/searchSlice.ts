import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  CuisineQueryParam,
  DietQueryParam,
  DifficultyQueryParam,
  GetRecipesQueryParams,
  Recipe,
} from '../../../types/types';
import { getRecipesQueryParams } from '../../../utils/getRecipesQueryParams';

interface searchSliceState {
  data: Recipe[];
  page: number;
  hasMore: boolean;
  userInput?: string;
  queryParams?: GetRecipesQueryParams;
  isLoading?: boolean;
  difficulty?: DifficultyQueryParam;
  cuisine?: CuisineQueryParam;
  diet?: DietQueryParam;
}

const initialState: searchSliceState = {
  data: [],
  page: 1,
  hasMore: true,
  queryParams: getRecipesQueryParams(1, '', '', '', ''),
  userInput: '',
  isLoading: false,
  difficulty: '',
  cuisine: '',
  diet: '',
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
    setDifficulty: (state, action: PayloadAction<DifficultyQueryParam>) => {
      state.difficulty = action.payload;
    },
    setCuisine: (state, action: PayloadAction<CuisineQueryParam>) => {
      state.cuisine = action.payload;
    },
    setDiet: (state, action: PayloadAction<DietQueryParam>) => {
      state.diet = action.payload;
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
  setDifficulty,
  setCuisine,
  setDiet,
} = searchSlice.actions;
export default searchSlice.reducer;
