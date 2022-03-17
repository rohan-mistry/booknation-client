import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { IsLogin } from './CheckLogin';

const Protected = ({ component: Component,access, ...rest }) => {
 
  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          IsLogin()
        ) {
          return <Component {...props} />;
        } else {
          return (
            <Navigate
              to='/signin'
            />
          );
        }
      }}
    />
  );
};

export default Protected;