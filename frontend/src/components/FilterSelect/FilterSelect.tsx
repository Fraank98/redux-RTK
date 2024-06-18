import { useAppDispatch } from '../../lib/redux/hooks';
import {
  setCuisine,
  setDiet,
  setDifficulty,
} from '../../lib/redux/slices/searchSlice';
import { Cuisine, Diet, Difficulty } from '../../types/types';

export default function FilterSelect({
  name,
  id,
  options,
}: {
  name: string;
  id: string;
  options?: Difficulty[] | Cuisine[] | Diet[];
}) {
  const dispatch = useAppDispatch();

  const setFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.name) {
      case 'Cuisine':
        return dispatch(setCuisine(e.target.value));
      case 'Difficulty':
        return dispatch(setDifficulty(e.target.value));
      case 'Diet':
        return dispatch(setDiet(e.target.value));
    }
  };

  return (
    <div className='relative flex h-full w-full items-center justify-center'>
      <select
        className='h-full w-full appearance-none rounded-recipe-card bg-input-bg p-1 pl-3 shadow-default'
        name={name}
        id={id}
        onChange={(e) => setFilter(e)}
      >
        <option value='' disabled selected>
          {name}
        </option>
        <option value=''>All</option>
        {options?.map((option, index) => (
          <option key={index} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <div className='pointer-events-none absolute right-2 flex h-full items-center justify-center'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='currentColor'
          className='w-4'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            d='m19.5 8.25-7.5 7.5-7.5-7.5'
          />
        </svg>
      </div>
    </div>
  );
}
