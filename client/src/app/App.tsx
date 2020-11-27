import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../assets/styles/main.scss';
import '../assets/styles/app.less';
import PagesRoute from '../components/AppRoute/PagesRoute';
import checkAuth from '../utils/checkAuth';

import { fetchLanguages } from '../containers/Languages/languagesSlice';

const App: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  useEffect(() => {
    checkAuth();
    dispatch(fetchLanguages());
  }, [dispatch]);

  return (
    <Router>
      <Route component={PagesRoute} />
    </Router>
  );
};

export default App;
