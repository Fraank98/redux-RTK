import { paths } from './backend/backend';

export type AddCommentRequestBody = NonNullable<
  paths['/recipes/{id}/comments']['post']['requestBody']
>['content']['application/json'];
export type AddRecipeRequestBody = NonNullable<
  paths['/recipes']['post']['requestBody']
>['content']['multipart/form-data'];
