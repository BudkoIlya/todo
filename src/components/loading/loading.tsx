import React from 'react';
import styles from './loading.module.scss';
export const Loading: React.FC = () => {
  return (
    <div className={styles.circles}>
      <span className={styles.circle}/>
      <span className={styles.circle}/>
      <span className={styles.circle}/>
    </div>
  );
};
