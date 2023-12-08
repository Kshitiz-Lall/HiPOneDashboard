import { useSelector } from 'react-redux';

import { StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';
import Login from 'views/pages/authentication/authentication3/Login3';

import MainLayout from 'layout/MainLayout';
import { Navigate, Outlet, Route } from 'react-router';
import Dashboard from 'views/Default';
import Register from 'views/pages/authentication/authentication3/Register3';

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);
  const isAuth = localStorage.getItem('isLoggedIn');
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <Routes>
          <Route element={!isAuth ? <Outlet /> : <Navigate to={'/'} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
