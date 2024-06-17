import { BASE_URL } from '../../lib/redux/services/recipes';
import { ExtendedRecipe } from '../../types/types';

export default function RecipeCard({ recipe }: { recipe: ExtendedRecipe }) {
  return (
    <div className='grid h-96 w-full grid-cols-6 grid-rows-6 gap-2 rounded-recipe-card bg-recipe-card-bg p-3 shadow-default'>
      <div className='relative col-span-2 row-span-2 overflow-hidden rounded-recipe-card'>
        <img
          src={BASE_URL + `${recipe.image}`}
          alt='recipe'
          className='absolute h-full w-full object-cover'
        />
      </div>
      <div className='col-span-4 col-start-3 row-span-1'>
        <p className='line-clamp-2 text-lg uppercase leading-5 text-text-primary'>
          {recipe.name}
        </p>
      </div>
      {recipe.difficulty?.name && (
        <div className='col-span-4 col-start-3 row-span-1 row-start-2'>
          <p className='text-sm text-text-thin'>
            Difficulty: {recipe.difficulty.name}
          </p>
          <p className='text-sm text-text-thin'>Ready in 20 minutes</p>
        </div>
      )}
      <div className='col-span-6 row-span-1 row-start-3 flex items-center justify-center gap-2'>
        {recipe.cuisine?.name && (
          <div className='flex items-center justify-center rounded-full border border-solid border-secondary p-1 px-3'>
            <p className='text-center text-sm text-text-primary'>
              {recipe.cuisine.name}
            </p>
          </div>
        )}
        {recipe.diet?.name && (
          <div className='flex items-center justify-center rounded-full border border-solid border-secondary p-1 px-3'>
            <p className='text-center text-sm text-text-primary'>
              {recipe.diet.name}
            </p>
          </div>
        )}
      </div>
      <div className='col-span-6 row-span-1 row-start-4'>
        <p className='text-sm text-text-thin'>
          Ingredients:{' '}
          <span>{recipe.ingredients?.map((i) => i).join(' • ')}</span>
        </p>
      </div>
      <div className='col-span-6 row-start-5'>
        <p className='line-clamp-2 text-text-primary'>{recipe.instructions}</p>
      </div>
      <div className='col-span-6 row-span-1 row-start-6 flex items-center justify-center gap-2'>
        <div className='flex h-full w-full items-center justify-center rounded-recipe-card bg-primary px-3'>
          <button className='text-center text-text-secondary'>
            View details
          </button>
        </div>
      </div>
    </div>
  );
}
