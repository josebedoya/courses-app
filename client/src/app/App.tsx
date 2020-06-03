import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../assets/styles/main.scss';
import PagesRoute from '../components/AppRoute/PagesRoute';
import checkAuth from '../utils/checkAuth';

const App: React.FC = (): JSX.Element => {
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Router>
      <Route component={PagesRoute} />
    </Router>
  );
};

export default App;
