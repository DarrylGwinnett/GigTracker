import { createBrowserRouter, Navigate } from 'react-router';
import App from '../layout/App';
import HomePage from '../../features/home/HomePage';
import GigDashboard from '../../features/gigs/dashboard/GigDashboard';
import GigForm from '../../features/gigs/form/GigForm';
import GigDetailPage from '../../features/gigs/details/GigDetailPage';
import TestErrors from '../../features/errors/TestErrors';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/gigs/login/LoginForm';
import RequireAuth from './RequireAuth';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: 'gigs', element: <GigDashboard /> },
          { path: 'createGig', element: <GigForm key="create" /> },
          { path: 'manage/:id', element: <GigForm key="edit" /> },
          { path: 'gigs/:id', element: <GigDetailPage /> },
        ],
      },
      { path: '', element: <HomePage /> },
      { path: 'errors', element: <TestErrors /> },
      { path: 'notFound', element: <NotFound /> },
      { path: 'serverError', element: <ServerError /> },
      { path: 'login', element: <LoginForm /> },
      { path: '*', element: <Navigate replace to="/notFound" /> },
    ],
  },
]);
