import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import styles from './categories.module.scss';
import editImg from '../../assets/imgs/edit.png';
import deleteImg from '../../assets/imgs/delete.png';
import {
  CategoryT,
  activateEditCategory,
  deleteCategoryA,
  activeDeleteCategoryA,
  closeModalWindowCategoryA
} from '../../redux/category-reducer';
import { CreateTodoAndCategory } from '../modalWindows/createWindow/createTodoAndCategory';
import { ConfirmDelete } from '../modalWindows/confirmDeleteWindow/confirmDelete';

export const Categories: React.FC = () => {
  const {
    categories,
    isDeleteCategory,
    isCreateCategory,
    isEditCategory,
    isLoadingCategories
  } = useSelector((state: RootState) => state.categories);

  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);

  const dispatch = useDispatch();
  const closeWindow = () => {
    dispatch(closeModalWindowCategoryA());
  };
  const deleteCategory = () => {
    categoryId && dispatch(deleteCategoryA(categoryId));
  };
  return (
    <div>
      {isDeleteCategory && (
        <ConfirmDelete
          closeWindow={closeWindow}
          deleteItem={deleteCategory}
          isLoading={isLoadingCategories}
        />
      )}
      {(isCreateCategory || isEditCategory) && <CreateTodoAndCategory />}
      {categories.map(c => {
        return (
          <Category category={c} key={c.id} setCategoryId={setCategoryId} />
        );
      })}
    </div>
  );
};

const Category: React.FC<CategoryType> = ({ category, setCategoryId }) => {
  const dispatch = useDispatch();
  const editCategory = () => {
    dispatch(activateEditCategory(category));
  };
  const activateDeleteCategory = () => {
    setCategoryId(category.id);
    dispatch(activeDeleteCategoryA());
  };
  return (
    <div className={styles.category}>
      <div className={styles.leftPart}>
        <div className={styles.categoryName}>{category.name}</div>
        <div className={styles.description}>{category.description}</div>
      </div>
      <div className={styles.icons}>
        <img src={editImg} alt='edit' onClick={editCategory} />
        <img src={deleteImg} alt='delete' onClick={activateDeleteCategory} />
      </div>
    </div>
  );
};

type CategoryType = {
  category: CategoryT;
  setCategoryId: Dispatch<SetStateAction<string | undefined>>;
};
