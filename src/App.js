import { useDispatch, useSelector } from 'react-redux';

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
import { useEffect } from 'react';
import axios from 'axios';
import { setConversationData, setContactUsData } from 'store/dashboardSlice';

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);
  const isAuth = localStorage.getItem('isLoggedIn');
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`https://convwebsite-dev.genzeon.com/get_dashboard_data`)
      .then((response) => {
        const rows = response.data.data.map((item, index) => ({
          ...item,
          id: index.toString()
        }));
        dispatch(setConversationData(rows));
      })
      .catch((error) => {
        console.error('Error fetching data from the backend:', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://convwebsite-dev.genzeon.com/get_feedback_data`)
      .then((response) => {
        const rows = response.data.data.map((item, index) => ({
          ...item,
          id: index.toString()
        }));
        rows.sort((a, b) => b.id - a.id);
        dispatch(setContactUsData(rows));
      })
      .catch((error) => {
        console.error('Error fetching data from the backend:', error);
      });
  }, []);

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
