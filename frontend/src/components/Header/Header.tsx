import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='row-span-1 flex items-center justify-center p-1'>
      <Link
        to='/'
        className='text-center text-xl font-bold uppercase text-primary'
      >
        Recipe Book
      </Link>
      <Link to='/add-recipe'> Add Recipe</Link>
    </header>
  );
}
