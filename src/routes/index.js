import MainLayout from 'layout/MainLayout';
import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
// routes

import Loadable from 'ui-component/Loadable';
import Login from 'views/pages/authentication/authentication3/Login3';
import Register from 'views/pages/authentication/authentication3/Register3';
const Dashboard = Loadable(lazy(() => import('views/Default')));
const ConversationalPage = Loadable(lazy(() => import('views/conversational-page')));
const ContactUsPage = Loadable(lazy(() => import('views/contact-us-page')));
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const isAuth = localStorage.getItem('isLoggedIn');

  return useRoutes([
    {
      path: '/',
      element: isAuth ? <MainLayout /> : <Login />,
      children: [
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'conversational-page', element: <ConversationalPage /> },
        { path: 'contact-us-page', element: <ContactUsPage /> },
        { path: '', element: <Dashboard /> }
      ]
    },
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> }
  ]);
}
