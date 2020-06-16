import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import LoggedOutRoute from './LoggedOutRoute';

import LoginPage from '../../containers/LoginPage/LoginPage';
import NotFoundPage from '../../containers/notFound/NotFoundPage';
import DashboardPage from '../../containers/DashboardPage/DashboardPage';
import CategoriesPage from '../../containers/CoursesPages/CategoriesPage/CategoriesPage';
import TagsPage from '../../containers/CoursesPages/TagsPage/TagsPage';

export const PagesRoute = () => {
  return (
    <Switch>
      <LoggedOutRoute exact path='/' component={LoginPage} />
      <PrivateRoute exact path='/dashboard' component={DashboardPage} />
      <PrivateRoute
        exact
        path='/courses/categories'
        component={CategoriesPage}
      />
      <PrivateRoute
        exact
        path='/courses/tags'
        component={TagsPage}
      />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default PagesRoute;
