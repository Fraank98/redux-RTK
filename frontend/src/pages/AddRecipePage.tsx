import { useNavigate } from 'react-router-dom';
import AddRecipeForm from '../components/AddRecipeForm/AddRecipeForm';
import { useAddRecipeMutation } from '../lib/redux/services/recipes';

export default function AddRecipePage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [addRecipe, { isLoading, isSuccess, error, isError }] =
    useAddRecipeMutation();

  const navigation = useNavigate();

  if (isSuccess) {
    navigation('/');
  }

  return (
    <>
      {isLoading && (
        <div className='absolute z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm'>
          <p className='text-4xl font-bold text-text-secondary'>Loading...</p>
        </div>
      )}
      <AddRecipeForm addRecipe={addRecipe} />
    </>
  );
}
