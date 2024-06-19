import { useFormContext } from 'react-hook-form';
import { useAppDispatch } from '../../lib/redux/hooks';
import { Cuisine, Diet, Difficulty } from '../../types/types';
import { ActionCreatorWithOptionalPayload } from '@reduxjs/toolkit';

// omit and edit name and id types to make them non nullable
interface CustomSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'name' | 'id'> {
  reduxAction?: ActionCreatorWithOptionalPayload<string | undefined>;
  name: string;
  id: string;
  options?: Difficulty[] | Cuisine[] | Diet[];
  hideAllOption?: boolean;
}

export default function FilterSelect({
  reduxAction,
  name,
  id,
  options,
  hideAllOption,
  ...props
}: CustomSelectProps) {
  const dispatch = useAppDispatch();
  const register = useFormContext();

  return (
    <div className='relative flex h-full w-full items-center justify-center'>
      <select
        {...(register && register.register(name))}
        {...props}
        className={`${props.className} h-full w-full appearance-none truncate rounded-primary bg-input-bg p-1 pl-3 capitalize shadow-default`}
        name={name}
        id={id}
        onChange={
          reduxAction ? (e) => dispatch(reduxAction(e.target.value)) : () => {}
        }
      >
        <option value='' disabled selected>
          {name}
        </option>
        {!hideAllOption && <option value=''>All</option>}
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
