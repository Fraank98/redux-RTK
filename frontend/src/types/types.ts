import { paths, components } from './backend/backend';

export type AddCommentRequestBody = NonNullable<
  paths['/recipes/{id}/comments']['post']['requestBody']
>['content']['application/json'];
export type AddRecipeRequestBody = NonNullable<
  paths['/recipes']['post']['requestBody']
>['content']['multipart/form-data'];

export type Recipe = components['schemas']['Recipe'];

type ExtendedDifficulty = {
  id: string;
  name?: components['schemas']['Difficulty']['name'];
};

type ExtendedCuisine = {
  id: string;
  name?: components['schemas']['Cuisine']['name'];
};

type ExtendedDiet = {
  id: string;
  name?: components['schemas']['Diet']['name'];
};

// Recipe can includes cuisine, difficulty, and diet based on the query params
// in the generated open api spec they are not included
export interface ExtendedRecipe extends Recipe {
  difficulty?: ExtendedDifficulty;
  cuisine?: ExtendedCuisine;
  diet?: ExtendedDiet;
}
