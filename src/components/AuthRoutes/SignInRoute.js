import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { IsLogin } from './CheckLogin';

const SignInRoute = ({ component: Component, ...rest }) => {
  
  return (
    <Route
      {...rest}
      render={(props) => {
        if (
          !IsLogin()
        ) {
          return <Component {...props} />;
        } else {
          return <Navigate
              to='/'
          />
        }
      }}
    />
  );
};

export default SignInRoute;