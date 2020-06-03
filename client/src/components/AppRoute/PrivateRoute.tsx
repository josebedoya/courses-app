import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import Layout from '../Layout/Layout';

interface IProps {
  component: React.ComponentType<any>;
  type?: string;
  exact?: boolean;
  path: string;
}

const PrivateRoute = ({
  component: Component,
  type = 'left-sidebar',
  ...rest
}: IProps): JSX.Element => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Layout type={type}>
            <Component {...props} />
          </Layout>
        ) : (
          <Redirect to='/' />
        )
      }
    />
  );
};

export default PrivateRoute;
