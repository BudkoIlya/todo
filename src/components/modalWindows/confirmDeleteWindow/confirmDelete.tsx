import React from 'react';
import exitButton from '../../../assets/imgs/exitButton.png';
import styles from './confirmDelete.module.scss';
import { Loading } from '../../loading/loading';

type ConfirmDeleteT = {
  closeWindow: () => void;
  deleteItem: () => void;
  isLoading: boolean;
};

export const ConfirmDelete: React.FC<ConfirmDeleteT> = ({
  closeWindow,
  deleteItem,
  isLoading
}) => {
  return (
    <div className={styles.deleteWindow}>
      <div className={styles.confirmDelete}>
        <div className={styles.title}>
          <div>Удаление задачи</div>
          <div onClick={closeWindow}>
            <img src={exitButton} alt='exit' />
          </div>
        </div>
        <div className={styles.question}>
          Вы уверены, что хотите удалить задачу “Задача1”?
        </div>
        <div className={styles.loadAndButtons}>
          {isLoading && (
            <div className={styles.loading}>
              <Loading />
            </div>
          )}
          <div className={styles.buttons}>
            <button type='button' onClick={deleteItem}>
              Да
            </button>
            <button type='button' onClick={closeWindow}>
              Нет
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
