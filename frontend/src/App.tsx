import RecipeList from './components/RecipeList/RecipeList';

export default function App() {
  return (
    <div className='grid h-full grid-rows-10'>
      <header className='text-center text-3xl uppercase text-primary'>
        Recipe Book
      </header>
      <RecipeList />
    </div>
  );
}
