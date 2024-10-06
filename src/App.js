import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useSearchParams,
} from 'react-router-dom';
import Login from './pages/Auth/login';
import Signup from './pages/Auth/signup';
import { ThemeProvider } from '@emotion/react';
import { theme } from './Theme';
import Home from './pages/Home';
import ForgotPassword from './pages/Auth/forgotpassword';
import SetNewPassword from './pages/Auth/setnewpassword';
import Account from './pages/Account';
import AddNewBot from './pages/AddNewBot';

const ProtectedRoute = ({ children }) => {
  const [searchParams] = useSearchParams();
  const token =
    searchParams.get('accessToken') || localStorage.getItem('accessToken');

  if (!token) {
    return <Navigate to="/login" replace />;
  } else {
    localStorage.setItem('accessToken', token);
    return children;
  }
};

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/forgotPassword',
    element: <ForgotPassword />,
  },
  {
    path: '/setNewPassword',
    element: (
      <ProtectedRoute>
        <SetNewPassword />
      </ProtectedRoute>
    ),
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/account',
    element: (
      <ProtectedRoute>
        <Account />
      </ProtectedRoute>
    ),
  },
  {
    path: '/addNewBot',
    element: (
      <ProtectedRoute>
        <AddNewBot />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />;
    </ThemeProvider>
  );
}

export default App;
