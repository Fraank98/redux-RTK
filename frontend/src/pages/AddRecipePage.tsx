import { useNavigate } from 'react-router-dom';
import AddRecipeForm from '../components/AddRecipeForm/AddRecipeForm';
import { useAddRecipeMutation } from '../lib/redux/services/recipes';
import { enqueueSnackbar } from 'notistack';

export default function AddRecipePage() {
  const [addRecipe, { isLoading, isSuccess, error, isError }] =
    useAddRecipeMutation();

  const navigation = useNavigate();

  if (isSuccess) {
    navigation('/');
  }

  if (isError || error) {
    enqueueSnackbar({
      variant: 'error',
      message: 'Something went wrong...',
      preventDuplicate: true,
    });
  }

  return (
    <div className='relative row-span-9 grid lg:grid-cols-[25%_50%_25%]'>
      {isLoading && (
        <div className='absolute z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm'>
          <p className='text-4xl font-bold text-text-secondary'>Loading...</p>
        </div>
      )}
      <AddRecipeForm addRecipe={addRecipe} />
    </div>
  );
}
