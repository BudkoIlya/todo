import React from 'react';
import styles from './header.module.scss';
import { useDispatch } from 'react-redux';
import { activateCreateTodoA } from '../../redux/todo-reducer';
import { NavLink, useLocation } from 'react-router-dom';
import { PATHS } from '../../App';
import { log } from 'util';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const createTodoList = () => {
    dispatch(activateCreateTodoA());
  };
  const activeStyleLink = {
    color: '#8FB6FF'
  };
  const { pathname } = useLocation();

  const whatAdd =
    pathname === PATHS.tasks ? 'Добавить задачу' : 'Добавить категорию';

  const whatCreate =
    pathname === PATHS.tasks
      ? createTodoList
      : () => console.log('create categories');

  return (
    <div className={styles.header}>
      <div className={styles.title}>ToDoList</div>
      <div className={styles.tasksCategories}>
        <NavLink
          to={PATHS.tasks}
          activeStyle={activeStyleLink}
          className={styles.link}
        >
          Задачи
        </NavLink>
        <span> | </span>
        <NavLink
          to={PATHS.categories}
          activeStyle={activeStyleLink}
          className={styles.link}
        >
          Категории
        </NavLink>
      </div>
      <div onClick={whatCreate}>{whatAdd}</div>
    </div>
  );
};
