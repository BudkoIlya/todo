import React from 'react';
import styles from './createTodo.module.scss';
import { Field, Formik, FormikProps } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux';
import { addTodoA } from '../../../redux/todo-reducer';

type FormName = {
  taskName: string;
  categoryId: string;
  description: string;
};

export const TodoForm: React.FC<{ closeWindow: () => void }> = ({
  closeWindow
}) => {
  const { isEditTodo } = useSelector((state: RootState) => state.todoLists);
  const dispatch = useDispatch();
  const addTodo = (values: FormName) => {
    console.log('values', values);
    const newTodo = {
      id: 'todo' + new Date().getTime(),
      name: values.taskName,
      description: values.description,
      categoryId: values.categoryId
    };
    dispatch(addTodoA(newTodo));
  };
  return (
    <Formik
      enableReinitialize
      initialValues={{
        taskName: '',
        categoryId: '',
        description: ''
      }}
      onSubmit={values => {
        addTodo(values);
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
          name='taskName'
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
        type='textarea'
        name='description'
        placeholder='Введите описание задачи'
        onChange={handleChange}
      />
    </div>
  );
};
