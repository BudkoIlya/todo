import React from 'react';
import styles from './createTask.module.scss';
import { Field, Formik, FormikProps } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux';
import { addTodoA, updateTodoA, TodoListT } from '../../../redux/todo-reducer';

type FormName = Omit<TodoListT, 'id'>;

export const TaskForm: React.FC<{ closeWindow: () => void }> = ({
  closeWindow
}) => {
  const { isEditTodo } = useSelector((state: RootState) => state.todoLists);
  const dispatch = useDispatch();
  const addTodo = (values: FormName) => {
    const newTodo = {
      name: values.name,
      description: values.description,
      categoryId: values.categoryId
    };
    dispatch(addTodoA(newTodo));
  };
  const editTodo = (values: FormName) => {
    isEditTodo && dispatch(updateTodoA({ ...values, id: isEditTodo.id }));
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: isEditTodo ? isEditTodo.name : '',
        categoryId: isEditTodo ? isEditTodo.categoryId : '',
        description: isEditTodo ? isEditTodo.description : ''
      }}
      onSubmit={values => {
        isEditTodo ? editTodo(values) : addTodo(values);
      }}
    >
      {props => (
        <form onSubmit={props.handleSubmit}>
          <FirstFormsRow {...props} />
          <SecondFormsRow {...props} />
          <div className={styles.formButtons}>
            <button type='submit'>
              {isEditTodo ? 'Сохранить' : 'Создать'}
            </button>
            <button type='button' onClick={closeWindow}>
              Закрыть
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

const FirstFormsRow: React.FC<FormikProps<any>> = ({ handleChange }) => {
  const { categories } = useSelector((state: RootState) => state.categories);
  return (
    <div className={styles.firstFormsRow}>
      <div>
        <div className={styles.formName}>Имя</div>
        <Field
          type='text'
          onChange={handleChange}
          placeholder='Введите имя задачи'
          name='name'
        />
      </div>
      <div>
        <div className={`${styles.formName} ${styles.category}`}>Категория</div>
        <Field
          component='select'
          name='categoryId'
          placeholder='Выберите категорию'
          required
          onChange={handleChange}
        >
          <option value='' defaultValue='' hidden>
            Выберите категорию
          </option>
          {categories.map(({ id, name }) => {
            return (
              <option value={id} key={id}>
                {name}
              </option>
            );
          })}
        </Field>
      </div>
    </div>
  );
};

const SecondFormsRow: React.FC<FormikProps<any>> = ({ handleChange }) => {
  return (
    <div className={styles.secondFormsRow}>
      <div className={styles.formName}>Описание</div>
      <Field
        component='textarea'
        name='description'
        placeholder='Введите описание задачи'
        onChange={handleChange}
      />
    </div>
  );
};
