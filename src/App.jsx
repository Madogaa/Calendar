import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterView from './RouterView/RouterView';
import SiteEntry from './SiteEntry/SiteEntry'
import './App.css'

function App() {

  const routes = [
    {
      path: '/',
      component: SiteEntry,
      exact: true,
    },
  ];

  return (
    <>
    <Router>
      <RouterView routes={routes} />
    </Router>
    </>
  )
}

export default App
