import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import styles from './categories.module.scss';
import editImg from '../../assets/imgs/editTodo.png';
import deleteImg from '../../assets/imgs/deleteTodo.png';
import { CategoryT } from '../../redux/category-reducer';
import { CreateTodoAndCategory } from '../createTaskAndCategory/createTodoAndCategory';

export const Categories: React.FC = () => {
  const { categories } = useSelector((state: RootState) => state.categories);
    const { isCreateCategory, isEditCategory } = useSelector(
        (state: RootState) => state.categories
    );

  return (
    <div>
      {(isCreateCategory || isEditCategory) && <CreateTodoAndCategory />}
      {categories.map(c => {
        return <Category category={c} key={c.id} />;
      })}
    </div>
  );
};

const Category: React.FC<{ category: CategoryT }> = ({ category }) => {
  return (
    <div className={styles.category}>
      <div className={styles.leftPart}>
        <div className={styles.categoryName}>{category.name}</div>
        <div className={styles.description}>{category.description}</div>
      </div>
      <div className={styles.icons}>
        <img src={editImg} alt='edit' />
        <img src={deleteImg} alt='delete' />
      </div>
    </div>
  );
};
