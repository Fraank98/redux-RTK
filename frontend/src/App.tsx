import RecipeList from './components/RecipeList/RecipeList';
import Search from './components/Search/Search';
import useSearchEngine from './hook/useSearchEngine';

export default function App() {
  const { error, isLoading } = useSearchEngine();

  return (
    <div className='grid h-full grid-rows-10'>
      <div className='row-span-2 row-start-1 grid grid-rows-4'>
        <header className='row-span-1 p-1'>
          <p className='text-center text-xl font-bold uppercase text-primary'>
            Recipe Book
          </p>
        </header>
        <Search />
      </div>
      <RecipeList error={error} isLoading={isLoading} />
    </div>
  );
}
