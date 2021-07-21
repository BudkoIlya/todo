import React from 'react';
import styles from './taskForm.module.scss';
import { Field, Form, FormikProps } from 'formik';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux';

export const TaskForm: React.FC<{ formikProps: FormikProps<any> }> = ({
  formikProps,
  children
}) => {
  return (
    <Form onSubmit={formikProps.handleSubmit}>
      <FirstFormsRow {...formikProps} />
      <SecondFormsRow {...formikProps} />
      {children}
    </Form>
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
          <option defaultValue=''>Выберите категорию</option>
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
