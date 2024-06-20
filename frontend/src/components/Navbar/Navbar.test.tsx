import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import Navbar from './Navbar';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');

  return {
    __esModule: true,
    ...originalModule,
    NavLink: jest.fn(),
  };
});

describe('Navbar Component', () => {
  test('renders Navbar component correctly', () => {
    render(<Navbar />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });
});
