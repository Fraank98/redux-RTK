import {
  CuisineQueryParam,
  DietQueryParam,
  DifficultyQueryParam,
  GetRecipesQueryParams,
  Page,
  QueryInput,
} from '../types/types';

export const LIMIT: number = 3; // number of recipes per page

// useful in order to not to write the same code over and over
export const getRecipesQueryParams = (
  page: Page,
  q: QueryInput,
  cuisineId?: CuisineQueryParam,
  dietId?: DietQueryParam,
  difficultyId?: DifficultyQueryParam
): GetRecipesQueryParams => ({
  _page: page,
  _limit: LIMIT,
  _expand: ['cuisine', 'diet', 'difficulty'] as (
    | 'cuisine'
    | 'diet'
    | 'difficulty'
  )[],
  q: q,
  cuisineId: cuisineId,
  dietId: dietId,
  difficultyId: difficultyId,
});
