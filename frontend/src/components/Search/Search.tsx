import { useDebouncedCallback } from 'use-debounce';
import { useAppDispatch } from '../../lib/redux/hooks';
import { isLoading, setUserInput } from '../../lib/redux/slices/searchSlice';

export default function Search() {
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
        <div className='relative flex h-full w-full items-center justify-center'>
          <select
            className='w-full appearance-none rounded-recipe-card bg-input-bg p-1 pl-3 shadow-default'
            name='cuisine'
            id='cuisine'
          >
            <option value='' disabled>
              Cuisine
            </option>
            <option value='italian'>Italian</option>
            <option value='mexican'>Mexican</option>
            <option value='chinese'>Chinese</option>
            <option value='korean'>Korean</option>
            <option value='japanese'>Japanese</option>
            <option value='american'>American</option>
          </select>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            className='pointer-events-none absolute right-2 top-3 w-4'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='m19.5 8.25-7.5 7.5-7.5-7.5'
            />
          </svg>
        </div>
        <div className='relative flex h-full w-full items-center justify-center'>
          <select
            className='w-full appearance-none rounded-recipe-card bg-input-bg p-1 pl-3 shadow-default'
            name='diet'
            id='diet'
          >
            <option value='' disabled>
              Diet
            </option>
            <option value='italian'>Italian</option>
            <option value='mexican'>Mexican</option>
            <option value='chinese'>Chinese</option>
            <option value='korean'>Korean</option>
            <option value='japanese'>Japanese</option>
            <option value='american'>American</option>
          </select>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            className='pointer-events-none absolute right-2 top-3 w-4'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='m19.5 8.25-7.5 7.5-7.5-7.5'
            />
          </svg>
        </div>
        <div className='relative flex h-full w-full items-center justify-center'>
          <select
            className='w-full appearance-none rounded-recipe-card bg-input-bg p-1 pl-3 shadow-default'
            name='difficulty'
            id='difficulty'
          >
            <option value='' disabled>
              Difficulty
            </option>
            <option value='italian'>Italian</option>
            <option value='mexican'>Mexican</option>
            <option value='chinese'>Chinese</option>
            <option value='korean'>Korean</option>
            <option value='japanese'>Japanese</option>
            <option value='american'>American</option>
          </select>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            className='pointer-events-none absolute right-2 top-3 w-4'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='m19.5 8.25-7.5 7.5-7.5-7.5'
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
