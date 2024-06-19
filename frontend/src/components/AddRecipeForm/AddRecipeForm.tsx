import {
  useFieldArray,
  SubmitHandler,
  useForm,
  FormProvider,
} from 'react-hook-form';
import {
  useGetCuisinesQuery,
  useGetDietsQuery,
  useGetDifficultiesQuery,
} from '../../lib/redux/services/filters';
import { useState } from 'react';
import { paths } from '../../types/backend/backend';
import IngredientsHandler from './IngredientsHandler';
import ImageInput from './ImageInput';
import PreferencesSelect from './PreferencesSelect';

type AddRecipeRequestBody = NonNullable<
  paths['/recipes']['post']['requestBody']
>['content']['multipart/form-data'];

//due to react-hook-form that uses these keys as name for the inputs
export type FormData = Omit<
  AddRecipeRequestBody,
  'ingredients' | 'cuisineId' | 'dietId' | 'difficultyId'
> & {
  ingredients: { value: string }[];
  cuisine: string;
  diet: string;
  difficulty: string;
};

export default function AddRecipeForm({
  addRecipe,
}: {
  addRecipe: (formData: AddRecipeRequestBody) => void;
}) {
  const { data: cuisines } = useGetCuisinesQuery();
  const { data: diets } = useGetDietsQuery();
  const { data: difficulties } = useGetDifficultiesQuery();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const methods = useForm<FormData>({
    defaultValues: {
      ingredients: [{ value: '' }],
    },
  });

  const {
    fields: ingredients,
    append,
    remove,
  } = useFieldArray({
    control: methods.control,
    name: 'ingredients',
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const requestBody: AddRecipeRequestBody = {
      name: data.name,
      instructions: data.instructions,
      dietId: data.diet,
      cuisineId: data.cuisine,
      difficultyId: data.difficulty,
      image: data.image && data.image[0],
    };
    requestBody.ingredients = data.ingredients.map(
      (ingredient) => ingredient.value
    );
    addRecipe(requestBody);
  };
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className='row-span-9 grid grid-cols-1 gap-4 overflow-scroll px-3 pb-6'
      >
        <div className='grid gap-3'>
          <p className='text-text-primary'>Recipe Detailes</p>
          <input
            required
            className='h-12 w-full rounded-primary bg-input-bg p-1 pl-3 shadow-default'
            placeholder='Recipe Name'
            {...methods.register('name')}
          />
          <textarea
            className='h-20 w-full resize-none rounded-primary bg-input-bg p-1 pl-3 shadow-default placeholder:pt-1'
            required
            placeholder='Recipe Instructions'
            {...methods.register('instructions')}
          />
          <IngredientsHandler {...{ ingredients, methods, append, remove }} />
        </div>
        <ImageInput {...{ imageUrl, setImageUrl, methods }} />
        <PreferencesSelect {...{ cuisines, diets, difficulties, methods }} />
        <button
          className='mt-6 w-full rounded-primary bg-primary p-3 uppercase text-text-secondary'
          type='submit'
        >
          Add Recipe
        </button>
      </form>
    </FormProvider>
  );
}
