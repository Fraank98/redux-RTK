import { useDebouncedCallback } from 'use-debounce';
import { useAppDispatch } from '../../lib/redux/hooks';
import { isLoading, setUserInput } from '../../lib/redux/slices/searchSlice';
import {
  useGetCuisinesQuery,
  useGetDietsQuery,
  useGetDifficultiesQuery,
} from '../../lib/redux/services/filters';
import FilterSelect from '../FilterSelect/FilterSelect';

export default function Search() {
  const { data: diets } = useGetDietsQuery();
  const { data: difficulties } = useGetDifficultiesQuery();
  const { data: cuisines } = useGetCuisinesQuery();
  const dispatch = useAppDispatch();

  const debounced = useDebouncedCallback((value: string) => {
    dispatch(setUserInput(value));
    dispatch(isLoading(false));
  }, 1000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(isLoading(true));
    debounced(e.target.value);
  };

  return (
    <div className='row-span-3 row-start-2 grid grid-rows-8 px-3'>
      <div className='relative row-span-5 flex items-center justify-center'>
        <input
          type='text'
          className='w-full rounded-recipe-card bg-input-bg p-3 shadow-default'
          placeholder='Search for recipes...'
          onChange={handleChange}
        />
      </div>
      <div className='row-span-3 flex h-full items-center justify-center gap-2'>
        <FilterSelect name='Cuisine' id='cuisine' options={cuisines} />
        <FilterSelect
          name='Difficulty'
          id='difficulty'
          options={difficulties}
        />
        <FilterSelect name='Diet' id='diet' options={diets} />
      </div>
    </div>
  );
}
