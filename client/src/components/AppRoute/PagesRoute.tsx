import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { notification } from 'antd';

import { RootState } from './../../app/rootReducer';

import PrivateRoute from './PrivateRoute';
import LoggedOutRoute from './LoggedOutRoute';

import LoginPage from '../../containers/LoginPage/LoginPage';
import NotFoundPage from '../../containers/notFound/NotFoundPage';
import DashboardPage from '../../containers/DashboardPage/DashboardPage';
import CategoriesPage from '../../containers/CoursesPages/CategoriesPage/CategoriesPage';

export const PagesRoute = () => {
  const { type, message, description } = useSelector(
    (state: RootState) => state.notification,
  );

  useEffect(() => {
    if (type !== null) {
      openNotificationWithIcon(type, 'message', 'description');
    }
  }, [type]);

  const openNotificationWithIcon = (
    type: string,
    message: string,
    description: string,
  ) => {
    notification.open({
      message,
      description,
    });
  };

  return (
    <Switch>
      <LoggedOutRoute exact path='/' component={LoginPage} />
      <PrivateRoute exact path='/dashboard' component={DashboardPage} />
      <PrivateRoute
        exact
        path='/courses/categories'
        component={CategoriesPage}
      />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default PagesRoute;
