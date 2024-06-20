import { useEffect, useRef } from 'react';
import RecipeCard from '../Recipe/RecipeCard';
import { useAppDispatch, useAppSelector } from '../../lib/redux/hooks';
import { setPage } from '../../lib/redux/slices/searchSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export default function RecipeList({
  error,
  isError,
  isLoading,
  isFetching,
}: {
  error: FetchBaseQueryError | SerializedError | undefined;
  isError: boolean;
  isLoading: boolean;
  isFetching: boolean;
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

  if (error || isError)
    return (
      <p className='absolute left-0 right-0 top-2/4 m-auto text-center text-3xl text-text-primary'>
        Oh no, there was an error. <br /> Try again later
      </p>
    );

  if (isLoading || isQuering || isFetching)
    return (
      <p className='absolute left-0 right-0 top-2/4 m-auto text-center text-3xl text-text-primary'>
        Loading...
      </p>
    );

  return (
    <div className='relative row-span-8 row-start-3 grid grid-rows-8'>
      <div
        ref={recipeListRef}
        className='row-span-7 grid grid-flow-dense place-items-center gap-3 overflow-scroll px-3 pb-6 pt-4 md:grid-cols-3 lg:row-span-8 lg:auto-cols-min lg:auto-rows-min lg:grid-cols-4 lg:gap-6 lg:pb-28'
      >
        {recipes?.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
        {recipes.length === 0 && (
          <p className='text-center text-text-primary'>No recipes found</p>
        )}
      </div>
      <div className='row-span-1 grid grid-cols-3 shadow-default lg:absolute lg:bottom-5 lg:left-0 lg:right-0 lg:m-auto lg:flex lg:max-w-96 lg:items-center lg:justify-center lg:gap-5 lg:rounded-element lg:bg-white lg:p-3'>
        <div className='flex items-center justify-center'>
          <button
            disabled={page === 1}
            onClick={() => dispatch(setPage(page - 1))}
            className={`${page === 1 ? 'opacity-50' : ''} rounded-element bg-primary p-3 px-6 text-center text-lg text-text-secondary`}
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
            className={`${!hasMore ? 'opacity-50' : ''} flex items-center justify-center rounded-element bg-primary p-3 px-6 text-lg text-text-secondary`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
