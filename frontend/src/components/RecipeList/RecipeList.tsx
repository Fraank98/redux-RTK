import { useEffect, useRef } from 'react';
import RecipeCard from '../Recipe/RecipeCard';
import { useAppDispatch, useAppSelector } from '../../lib/redux/hooks';
import { setPage } from '../../lib/redux/slices/searchSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export default function RecipeList({
  error,
  isLoading,
}: {
  error: FetchBaseQueryError | SerializedError | undefined;
  isLoading: boolean;
}) {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.searchSlice.page);
  const hasMore = useAppSelector((state) => state.searchSlice.hasMore);
  const recipes = useAppSelector((state) => state.searchSlice.data);
  const isQuering = useAppSelector((state) => state.searchSlice.isLoading);
  const recipeListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    recipeListRef &&
      recipeListRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  if (error)
    return (
      <p className='absolute left-0 right-0 top-2/4 m-auto text-center text-3xl text-text-primary'>
        Oh no, there was an error. <br /> Try again later
      </p>
    );

  if (isLoading || isQuering)
    return (
      <p className='absolute left-0 right-0 top-2/4 m-auto text-center text-3xl text-text-primary'>
        Loading...
      </p>
    );

  return (
    <div className='relative row-span-8 row-start-3 grid grid-rows-8'>
      <div
        ref={recipeListRef}
        className='row-span-7 grid gap-3 overflow-scroll p-4 pb-6'
      >
        {recipes?.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      <div className='row-span-1 grid grid-cols-3 shadow-default'>
        <div className='flex items-center justify-center'>
          <button
            disabled={page === 1}
            onClick={() => dispatch(setPage(page - 1))}
            className={`${page === 1 ? 'opacity-50' : ''} rounded-full bg-primary p-3 px-6 text-center text-lg text-text-secondary`}
          >
            Prev
          </button>
        </div>
        <div className='flex items-center justify-center'>
          <p className='text-text-primary'>Page {page}</p>
        </div>
        <div className='flex items-center justify-center'>
          <button
            disabled={!hasMore}
            onClick={() => dispatch(setPage(page + 1))}
            className={`${!hasMore ? 'opacity-50' : ''} flex items-center justify-center rounded-full bg-primary p-3 px-6 text-lg text-text-secondary`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
