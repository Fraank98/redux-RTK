import RecipeList from '../components/RecipeList/RecipeList';
import Search from '../components/Search/Search';
import useSearchEngine from '../hook/useSearchEngine';

export default function Home() {
  const { error, isLoading } = useSearchEngine();

  return (
    <div className='row-span-9 grid h-full grid-rows-10'>
      <div className='row-span-2 row-start-1 grid grid-rows-4'>
        <Search />
      </div>
      <RecipeList error={error} isLoading={isLoading} />
    </div>
  );
}
