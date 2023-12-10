import MainLayout from 'layout/MainLayout';
import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
// routes

import Loadable from 'ui-component/Loadable';
import Login from 'views/pages/authentication/authentication3/Login3';
import Register from 'views/pages/authentication/authentication3/Register3';
const Dashboard = Loadable(lazy(() => import('views/Default')));
const ConversationalPage = Loadable(lazy(() => import('views/Default/ConversationTable')));
const ContactUsPage = Loadable(lazy(() => import('views/Default/ContactUsTable')));
const ApiStatusPage = Loadable(lazy(() => import('views/Default/APIStatus')));
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
        { path: 'api-status-page', element: <ApiStatusPage /> },
        { path: '', element: <Dashboard /> }
      ]
    },
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> }
  ]);
}
