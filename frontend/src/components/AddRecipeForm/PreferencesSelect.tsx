import { useFormContext } from 'react-hook-form';
import FilterSelect from '../FilterSelect/FilterSelect';
import { paths } from '../../types/backend/backend';

export default function PreferencesSelect({
  cuisines,
  diets,
  difficulties,
}: {
  cuisines?: paths['/cuisines']['get']['responses']['200']['content']['application/json'];
  diets?: paths['/diets']['get']['responses']['200']['content']['application/json'];
  difficulties?: paths['/difficulties']['get']['responses']['200']['content']['application/json'];
}) {
  const form = useFormContext();

  return (
    <div className='grid gap-3'>
      <p className='text-text-primary'>Preferences</p>
      <FilterSelect
        data-testid='cuisine'
        required
        hideAllOption
        options={cuisines}
        {...form.register('cuisine')}
        id='cuisine'
        className='!h-12'
      />
      <FilterSelect
        data-testid='diet'
        required
        hideAllOption
        options={diets}
        {...form.register('diet')}
        id='diet'
        className='!h-12'
      />
      <FilterSelect
        data-testid='difficulty'
        required
        hideAllOption
        options={difficulties}
        {...form.register('difficulty')}
        id='difficulty'
        className='!h-12'
      />
    </div>
  );
}
