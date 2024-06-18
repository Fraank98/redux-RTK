import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../lib/redux/hooks';
import { getRecipesQueryParams } from '../utils/getRecipesQueryParams';
import {
  recipesApi,
  useGetRecipesQuery,
  usePrefetchRecipes,
} from '../lib/redux/services/recipes';
import {
  setData,
  setHasMore,
  setPage,
  setQueryParams,
} from '../lib/redux/slices/searchSlice';
import { GetRecipesQueryParams } from '../types/types';

export default function useSearchEngine() {
  const dispatch = useAppDispatch();
  const queryParams = useAppSelector((state) => state.searchSlice.queryParams);
  const { data, error, isLoading } = useGetRecipesQuery(queryParams);
  const page = useAppSelector((state) => state.searchSlice.page);
  const userInput = useAppSelector((state) => state.searchSlice.userInput);
  const prefetchPage = usePrefetchRecipes('getRecipes');
  const prefetchedData = useAppSelector(
    (state) =>
      recipesApi.endpoints.getRecipes.select({
        ...getRecipesQueryParams(page + 1),
        q: userInput,
      })(state).data
  );
  // by prefetching data, is it possible to:
  // reduce the perceived loading times when a user navigates
  // enhance performance
  // know if there are more recipes to load

  const prefetchNextPage = useCallback(
    (config: GetRecipesQueryParams) => {
      prefetchPage(config);
    },
    [prefetchPage, page]
  );

  useEffect(() => {
    dispatch(
      setQueryParams({
        ...getRecipesQueryParams(page),
        q: userInput,
      })
    );
    prefetchNextPage({ ...getRecipesQueryParams(page + 1), q: userInput });
  }, [page]);

  useEffect(() => {
    dispatch(setData(data || []));

    // check if there are more recipes
    if (data) {
      dispatch(setHasMore(!(prefetchedData && prefetchedData.length === 0)));
    }
  }, [data, prefetchedData]);

  useEffect(() => {
    dispatch(setPage(1));
    dispatch(setQueryParams({ ...getRecipesQueryParams(1), q: userInput }));
    prefetchNextPage({ ...getRecipesQueryParams(2), q: userInput });
  }, [userInput]);

  return { error, isLoading, prefetchNextPage };
}
