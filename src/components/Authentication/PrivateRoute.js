import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('token'); // O usa sessionStorage o un estado global
  
  return token ? element : <Navigate to="/" />;
};

export default PrivateRoute;
