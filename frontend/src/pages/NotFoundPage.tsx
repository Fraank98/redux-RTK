import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className='row-span-9 flex flex-col items-center justify-center'>
      <p className='text-3xl text-text-primary'>Page Not Found 🫠</p>
      <p className='text-text-primary'>Please check the URL and try again.</p>
      <Link to='/' className='cursor-pointer p-2 text-text-primary underline'>
        Go Home
      </Link>
    </div>
  );
}
