import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterView from './RouterView/RouterView';
import { AppProvider } from './Context/AppContext';
import SiteEntry from './SiteEntry/SiteEntry'
import Login from './SiteEntry/Login';
import SignUp from './SiteEntry/SignUp';
import Main from './Activity/Main';

import './App.css'

function App() {

  const routes = [
    {
      path: '/',
      component: <SiteEntry />,
      exact: true,
    },
    {
      path: '/login',
      component: <SiteEntry component={<Login />} />,
      exact: true,
    },
    {
      path: '/signup',
      component: <SiteEntry component={<SignUp />} />,
      exact: true,
    },
    {
      path: '/main',
      component: <Main />,
      exact: true,
    },
  ];

  return (
    <>
    <Router>
      <AppProvider>
        <RouterView routes={routes} />
      </AppProvider>
    </Router>
    </>
  )
}

export default App
