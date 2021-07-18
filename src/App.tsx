import React from 'react';
import './App.css';
import { Header } from './components/header/header';
import { Tasks } from './components/tasks/tasks';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Categories } from './components/categories/categories';

export const PATHS = {
    tasks: '/tasks',
    categories: '/categories'
}

const App: React.FC = () => {
  return (
    <div className='App'>
      <Header />
      <Switch>
        <Redirect exact from='/' to='/tasks' />
        <Route path={PATHS.tasks}>
          <Tasks />
        </Route>
        <Route exact path={PATHS.categories}>
          <Categories />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
