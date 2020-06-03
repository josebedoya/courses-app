import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';

interface IProps {
  component: React.ComponentType<any>;
  exact?: boolean;
  path: string;
}

const LoggedOutRoute = ({
  component: Component,
  ...rest
}: IProps): JSX.Element => {
  const { isAuthenticated } = useSelector( (state: RootState) => state.auth);
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
