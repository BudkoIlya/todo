import React from 'react';
import { Field, Form, FormikProps } from 'formik';
import styles from './categoryForm.module.scss';

export const CategoryForm: React.FC<{ formikProps: FormikProps<any> }> = ({
  formikProps: { handleChange, handleSubmit },
  children
}) => {
  return (
    <Form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <div className={styles.title}>Имя</div>
        <Field
          type='text'
          onChange={handleChange}
          placeholder='Введите имя категории'
          name='name'
        />
      </div>
      <div>
        <div className={styles.title}>Описание</div>
        <Field
          component='textarea'
          name='description'
          placeholder='Введите описание категории'
          onChange={handleChange}
        />
      </div>
      {children}
    </Form>
  );
};
