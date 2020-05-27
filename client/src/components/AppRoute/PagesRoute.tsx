import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import LoggedOutRoute from './LoggedOutRoute';

import LoginPage from '../../containers/login/LoginPage';
import NotFoundPage from '../../containers/notFound/NotFoundPage';
import DashboardPage from '../../containers/dashboard/DashboardPage';

export const PagesRoute = () => {
  return (
    <Switch>
      <LoggedOutRoute exact path='/' component={LoginPage} />
      <PrivateRoute exact path='/dashboard' component={DashboardPage} />
      <Route component={NotFoundPage} />
    </Switch>
  )
}

export default PagesRoute;
