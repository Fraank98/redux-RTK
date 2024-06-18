import { paths, components } from './backend/backend';

export type AddCommentRequestBody = NonNullable<
  paths['/recipes/{id}/comments']['post']['requestBody']
>['content']['application/json'];
export type AddRecipeRequestBody = NonNullable<
  paths['/recipes']['post']['requestBody']
>['content']['multipart/form-data'];

export type Recipe = components['schemas']['Recipe'];

export type Difficulty = components['schemas']['Difficulty'];

export type Cuisine = components['schemas']['Cuisine'];

export type Diet = components['schemas']['Diet'];

// Recipe can includes cuisine, difficulty, and diet based on the query params
// in the generated open api spec they are not included
export interface ExtendedRecipe extends Recipe {
  difficulty?: Difficulty;
  cuisine?: Cuisine;
  diet?: Diet;
}

export type GetRecipesQueryParams =
  paths['/recipes']['get']['parameters']['query'];

export type Page = NonNullable<GetRecipesQueryParams>['_page'];
export type QueryInput = NonNullable<GetRecipesQueryParams>['q'];
export type DifficultyQueryParam = NonNullable<
  paths['/recipes']['get']['parameters']['query']
>['difficultyId'];
export type CuisineQueryParam = NonNullable<
  paths['/recipes']['get']['parameters']['query']
>['cuisineId'];
export type DietQueryParam = NonNullable<
  paths['/recipes']['get']['parameters']['query']
>['dietId'];
