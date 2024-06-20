import { useDebouncedCallback } from 'use-debounce';
import { useAppDispatch } from '../../lib/redux/hooks';
import {
  isLoading,
  setCuisine,
  setDiet,
  setDifficulty,
  setUserInput,
} from '../../lib/redux/slices/searchSlice';
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
    <div className='row-span-4 row-start-1 grid grid-rows-8 place-items-center px-3 md:place-items-center'>
      <div className='relative row-span-5 flex w-full items-center justify-center lg:w-full'>
        <input
          type='text'
          className='w-full max-w-[40rem] rounded-primary bg-input-bg p-3 shadow-default'
          placeholder='Search for recipes...'
          onChange={handleChange}
        />
      </div>
      <div className='row-span-2 flex h-full w-full max-w-lg items-center justify-center gap-2'>
        <FilterSelect
          name='Cuisine'
          id='cuisine'
          options={cuisines}
          reduxAction={setCuisine}
        />
        <FilterSelect
          name='Difficulty'
          id='difficulty'
          options={difficulties}
          reduxAction={setDifficulty}
        />
        <FilterSelect
          name='Diet'
          id='diet'
          options={diets}
          reduxAction={setDiet}
        />
      </div>
    </div>
  );
}
