import React from 'react';
import styles from './header.module.scss';
import { useDispatch } from 'react-redux';
import { activateCreateTodoA} from '../../redux/todo-reducer';

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const createTodoList = () => {
    dispatch(activateCreateTodoA());
  };
  return (
    <div className={styles.header}>
      <div className={styles.title}>ToDoList</div>
      <div className={styles.tasksCategories}>Задачи | Категории</div>
      <div onClick={createTodoList}>Добавить задачу</div>
    </div>
  );
};
