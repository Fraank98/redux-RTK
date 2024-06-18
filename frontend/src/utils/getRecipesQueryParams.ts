import { GetRecipesQueryParams } from '../types/types';

export const LIMIT: number = 3;

// useful in order to not to write the same code over and over
export const getRecipesQueryParams = (page: number): GetRecipesQueryParams => ({
  _page: page,
  _limit: LIMIT,
  _expand: ['cuisine', 'diet', 'difficulty'] as (
    | 'cuisine'
    | 'diet'
    | 'difficulty'
  )[],
  q: '',
});
