import React from 'react';
import exitButton from '../../../assets/imgs/exitButton.png';
import styles from './createTodoAndCategory.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTodoA,
  closeModalWindowTodoA,
  TodoListT,
  updateTodoA
} from '../../../redux/todo-reducer';
import { TaskForm } from '../../tasks/taskForm/taskForm';
import { RootState } from '../../../redux';
import { Formik } from 'formik';
import {
  addCategoryA,
  CategoryT,
  closeModalWindowCategoryA,
  updateCategoryA
} from '../../../redux/category-reducer';
import { CategoryForm } from '../../categories/categoryForm/categoryForm';
import { Loading } from '../../loading/loading';

type FormNameTodo = Omit<TodoListT, 'id'>;
type FormNameCategory = Omit<CategoryT, 'id'>;

export const CreateTodoAndCategory: React.FC = () => {
  const { isEditTodo, isCreateTodo, isLoadingTodo } = useSelector(
    (state: RootState) => state.todoLists
  );
  const { isEditCategory, isLoadingCategories } = useSelector(
    (state: RootState) => state.categories
  );
  const isTodo = isEditTodo || isCreateTodo;

  const dispatch = useDispatch();

  const addTodo = (values: FormNameTodo) => {
    const newTodo = {
      name: values.name,
      description: values.description,
      categoryId: values.categoryId
    };
    dispatch(addTodoA(newTodo));
  };
  const editTodo = (values: FormNameTodo) => {
    isEditTodo && dispatch(updateTodoA({ ...values, id: isEditTodo.id }));
  };
  const addCategory = (values: FormNameCategory) => {
    const newCategory = {
      name: values.name,
      description: values.description
    };
    dispatch(addCategoryA(newCategory));
  };
  const editCategory = (values: FormNameCategory) => {
    isEditCategory &&
      dispatch(updateCategoryA({ ...values, id: isEditCategory.id }));
  };
  const closeWindow = () => {
    isTodo
      ? dispatch(closeModalWindowTodoA())
      : dispatch(closeModalWindowCategoryA());
  };

  const initialValues = isTodo
    ? {
        name: isEditTodo ? isEditTodo.name : '',
        categoryId: isEditTodo ? isEditTodo.categoryId : '',
        description: isEditTodo ? isEditTodo.description : ''
      }
    : {
        name: isEditCategory ? isEditCategory.name : '',
        description: isEditCategory ? isEditCategory.description : ''
      };
  return (
    <div className={styles.modalWindow}>
      <div className={styles.createTodoAndCategory}>
        <div className={styles.titleBlock}>
          <div>
            {isEditTodo || isEditCategory ? 'Редактирование ' : 'Создание '}
            {isTodo ? 'задачи' : 'категории'}
          </div>
          <div onClick={closeWindow}>
            <img src={exitButton} alt='exit' />
          </div>
        </div>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={values => {
            if (isTodo) {
              isEditTodo ? editTodo(values) : addTodo(values);
            } else {
              isEditCategory ? editCategory(values) : addCategory(values);
            }
          }}
        >
          {props => (
            <>
              {isTodo ? (
                <TaskForm formikProps={props}>
                  <Buttons
                    isLoading={isLoadingTodo}
                    isEditTodo={isEditTodo}
                    closeWindow={closeWindow}
                  />
                </TaskForm>
              ) : (
                <CategoryForm formikProps={props}>
                  <Buttons
                    isLoading={isLoadingCategories}
                    isEditCategory={isEditCategory}
                    closeWindow={closeWindow}
                  />
                </CategoryForm>
              )}
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

type ButtonsT = {
  isEditTodo?: null | TodoListT;
  isEditCategory?: null | CategoryT;
  closeWindow: () => void;
  isLoading: boolean;
};

const Buttons: React.FC<ButtonsT> = ({
  isEditTodo,
  isEditCategory,
  closeWindow,
  isLoading
}) => {
  return (
    <div className={styles.formButtons}>
      {isLoading && (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}
      <div className={styles.buttons}>
        <button type='submit' disabled={isLoading}>
          {isEditTodo || isEditCategory ? 'Сохранить' : 'Создать'}
        </button>
        <button type='button' onClick={closeWindow}>
          Закрыть
        </button>
      </div>
    </div>
  );
};
