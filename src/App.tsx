import React, { useEffect } from 'react';
import './App.css';
import { Header } from './components/header/header';
import { Tasks } from './components/tasks/tasks';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Categories } from './components/categories/categories';
import { fetchCategoriesA } from './redux/category-reducer';
import { fetchTodosA } from './redux/todo-reducer';
import { useDispatch } from 'react-redux';

export const PATHS = {
  tasks: '/tasks',
  categories: '/categories'
};

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesA()); // need categories for tasks
    dispatch(fetchTodosA());
  }, [dispatch]);
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
