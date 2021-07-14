import React from 'react';
import exitButton from '../../../assets/imgs/exitButton.png';
import styles from './createTodo.module.scss';
import { useDispatch } from 'react-redux';
import { cancelA } from '../../../redux/todo-reducer';
import { TodoForm } from './todoForm';

export const CreateEditTodo: React.FC = () => {
  const dispatch = useDispatch();
  const closeWindow = () => {
    // console.log('close', new Date().getTime());
    dispatch(cancelA());
  };
  return (
    <div className={styles.modalWindow}>
      <div className={styles.createTodo}>
        <div className={styles.title}>
          <div>Создание задачи</div>
          <div onClick={closeWindow}>
            <img src={exitButton} alt='exit' />
          </div>
        </div>
        <TodoForm closeWindow={closeWindow} />
      </div>
    </div>
  );
};
