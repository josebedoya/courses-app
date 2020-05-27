import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './assets/styles/main.scss';
import PagesRoute from './components/AppRoute/PagesRoute';

const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <div className="inner-root">
        <Route component={PagesRoute} />
      </div>
    </Router>
  );
};

export default App;
