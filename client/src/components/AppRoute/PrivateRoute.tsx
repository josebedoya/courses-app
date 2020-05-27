import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface IProps {
  component: React.ComponentType<any>;
  exact?: boolean;
  path: string;
}

const PrivateRoute = ({
  component: Component,
  ...rest
}: IProps): JSX.Element => {
  const isAuthenticated: boolean | null = false;
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to='/' />
      }
    />
  );
};

export default PrivateRoute;
