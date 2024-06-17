import { useCallback, useEffect, useRef, useState } from 'react';
import {
  useGetRecipesQuery,
  usePrefetchRecipes,
} from '../../lib/redux/services/recipes';
import RecipeCard from '../Recipe/RecipeCard';

const LIMIT = 3;

// useful in order to not to write the same code over and over
const getQueryParams = (page: number) => ({
  _page: page,
  _limit: LIMIT,
  _expand: ['cuisine', 'diet', 'difficulty'] as (
    | 'cuisine'
    | 'diet'
    | 'difficulty'
  )[],
});

export default function RecipeList() {
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const recipeListRef = useRef<HTMLDivElement>(null);
  const { data, error, isLoading } = useGetRecipesQuery(getQueryParams(page));
  const prefetchPage = usePrefetchRecipes('getRecipes');
  // by prefetching data, is it possible to:
  // reduce the perceived loading times when a user navigates
  // enhance performance
  // know if there are more recipes to load
  const prefetchNextPage = useCallback(() => {
    prefetchPage(getQueryParams(page + 1));
  }, [prefetchPage, page]);

  useEffect(() => {
    prefetchNextPage();
    recipeListRef &&
      recipeListRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  useEffect(() => {
    if (data) {
      if (data.length === 0) {
        setLastPage(page);
        setPage(page - 1);
      }
      setHasMore(!(page === (lastPage && lastPage - 1) || data.length < LIMIT));
    }
  }, [page, data]);

  return (
    <div className='relative row-span-8 row-start-3 grid grid-rows-8'>
      {error && (
        <p className='absolute left-0 right-0 top-2/4 m-auto text-center text-3xl text-text-primary'>
          Oh no, there was an error. <br /> Try again later
        </p>
      )}
      {isLoading && (
        <p className='absolute left-0 right-0 top-2/4 m-auto text-center text-3xl text-text-primary'>
          Loading...
        </p>
      )}
      <div
        ref={recipeListRef}
        className='row-span-7 grid gap-3 overflow-scroll p-4 pb-6'
      >
        {data?.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
      </div>
      <div className='row-span-1 grid grid-cols-3 shadow-default'>
        <div className='flex items-center justify-center'>
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
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
            onClick={() => setPage(page + 1)}
            className={`${!hasMore ? 'opacity-50' : ''} flex items-center justify-center rounded-full bg-primary p-3 px-6 text-lg text-text-secondary`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
