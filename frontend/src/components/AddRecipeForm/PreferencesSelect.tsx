import { UseFormReturn } from 'react-hook-form';
import FilterSelect from '../FilterSelect/FilterSelect';
import { FormData } from './AddRecipeForm';
import { paths } from '../../types/backend/backend';

export default function PreferencesSelect({
  cuisines,
  diets,
  difficulties,
  methods,
}: {
  cuisines?: paths['/cuisines']['get']['responses']['200']['content']['application/json'];
  diets?: paths['/diets']['get']['responses']['200']['content']['application/json'];
  difficulties?: paths['/difficulties']['get']['responses']['200']['content']['application/json'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methods: UseFormReturn<FormData, any, undefined>;
}) {
  return (
    <div className='grid gap-3'>
      <p className='text-text-primary'>Preferences</p>
      <FilterSelect
        required
        hideAllOption
        options={cuisines}
        {...methods.register('cuisine')}
        id='cuisine'
        className='!h-12'
      />
      <FilterSelect
        required
        hideAllOption
        options={diets}
        {...methods.register('diet')}
        id='diet'
        className='!h-12'
      />
      <FilterSelect
        required
        hideAllOption
        options={difficulties}
        {...methods.register('difficulty')}
        id='difficulty'
        className='!h-12'
      />
    </div>
  );
}
