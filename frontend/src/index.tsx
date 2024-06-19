import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './lib/redux/store';
import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AddRecipePage from './pages/AddRecipePage';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';
import { SnackbarProvider } from 'notistack';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: '/add-recipe',
    element: (
      <>
        <Navbar />
        <AddRecipePage />
      </>
    ),
  },
  {
    path: '*',
    element: (
      <>
        <Navbar />
        <NotFoundPage />
      </>
    ),
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={store}>
      <SnackbarProvider autoHideDuration={3000} maxSnack={3}>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </Provider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
