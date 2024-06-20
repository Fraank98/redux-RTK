import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [hidden, setHidden] = useState(true);
  return (
    <>
      <nav className='row-span-1 bg-gray-100'>
        <div className='mx-auto max-w-6xl px-4'>
          <div className='flex justify-between'>
            <div className='flex space-x-4'>
              <div>
                <NavLink
                  to='/'
                  className='flex items-center px-2 py-5 text-gray-700'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke-width='1.5'
                    className='w-6 stroke-primary'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25'
                    />
                  </svg>

                  <span className='font-bold'>Recipe Book</span>
                </NavLink>
              </div>

              <div className='hidden items-center space-x-1 md:flex'>
                <NavLink
                  to='/'
                  className={({ isActive }) =>
                    `${isActive ? 'text-primary' : 'text-text-primary'} px-3 py-5 text-gray-700`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to='/add-recipe'
                  className={({ isActive }) =>
                    `${isActive ? 'text-primary' : 'text-text-primary'} px-3 py-5 text-gray-700`
                  }
                >
                  Add new recipe
                </NavLink>
              </div>
            </div>
            <div className='flex items-center md:hidden'>
              <button onClick={() => setHidden(!hidden)}>
                <svg
                  className='h-6 w-6'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div
          className={`${hidden ? 'hidden' : ''} absolute z-20 w-full bg-white shadow-xl md:hidden`}
        >
          <NavLink
            onClick={() => setHidden(!hidden)}
            to='/'
            className={({ isActive }) =>
              `${isActive ? 'text-primary' : 'text-text-primary'} block px-4 py-2 text-sm hover:bg-gray-200`
            }
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setHidden(!hidden)}
            to='/add-recipe'
            className={({ isActive }) =>
              `${isActive ? 'text-primary' : 'text-text-primary'} block px-4 py-2 text-sm hover:bg-gray-200`
            }
          >
            Add new recipe
          </NavLink>
        </div>
      </nav>
    </>
  );
}
