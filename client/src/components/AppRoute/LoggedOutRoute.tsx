import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface IProps {
  component: React.ComponentType<any>;
  exact?: boolean;
  path: string;
}

const LoggedOutRoute = ({
  component: Component,
  ...rest
}: IProps): JSX.Element => {
  const isAuthenticated: boolean | null = false;
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Redirect to='/dashboard' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default LoggedOutRoute;
