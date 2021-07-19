import React from 'react';
import exitButton from '../../assets/imgs/exitButton.png';
import styles from './createTodoAndCategory.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTodoA,
  closeModalWindowTodoA,
  TodoListT,
  updateTodoA
} from '../../redux/todo-reducer';
import { TaskForm } from '../tasks/taskForm/taskForm';
import { RootState } from '../../redux';
import { Formik } from 'formik';
import {
  addCategoryA,
  CategoryT,
  closeModalWindowCategoryA
} from '../../redux/category-reducer';
import { CategoryForm } from '../categories/categoryForm/categoryForm';

type FormNameTodo = Omit<TodoListT, 'id'>;
type FormNameCategory = Omit<CategoryT, 'id'>;

export const CreateTodoAndCategory: React.FC = () => {
  const { isEditTodo, isCreateTodo } = useSelector(
    (state: RootState) => state.todoLists
  );
  const { isEditCategory } = useSelector(
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
        <div className={styles.title}>
          <div>Создание {isTodo ? 'задачи' : 'категории'}</div>
          <div onClick={closeWindow}>
            <img src={exitButton} alt='exit' />
          </div>
        </div>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={values => {
            if (isTodo && values.categoryId) {
              isEditTodo ? editTodo(values) : addTodo(values);
              console.log('qqq');
            } else {
              console.log('www');
              isEditCategory ? console.log('edit') : addCategory(values);
            }
          }}
        >
          {props => (
            <>
              {isTodo ? (
                <TaskForm formikProps={props}>
                  <Buttons isEditTodo={isEditTodo} closeWindow={closeWindow} />
                </TaskForm>
              ) : (
                <CategoryForm formikProps={props}>
                  <Buttons
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
};

const Buttons: React.FC<ButtonsT> = ({
  isEditTodo,
  isEditCategory,
  closeWindow
}) => {
  return (
    <div className={styles.formButtons}>
      <button type='submit'>
        {isEditTodo || isEditCategory ? 'Сохранить' : 'Создать'}
      </button>
      <button type='button' onClick={closeWindow}>
        Закрыть
      </button>
    </div>
  );
};
