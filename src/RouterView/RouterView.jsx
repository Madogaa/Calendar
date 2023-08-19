import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';

const RouterView = ({ routes }) => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          element={<route.component />}
        />
      ))}
    </Routes>
  );
};

RouterView.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      exact: PropTypes.bool,
      component: PropTypes.elementType.isRequired,
    })
  ).isRequired,
};
export default RouterView;