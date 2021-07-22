import React from 'react';
import { Field, Form, FormikProps } from 'formik';
import styles from './categoryForm.module.scss';
import {
  validateDescCategory,
  validateName
} from '../../../validation/validation';

export const CategoryForm: React.FC<{ formikProps: FormikProps<any> }> = ({
  formikProps: { handleChange, handleSubmit, errors, touched },
  children
}) => {
  const isErrorName = errors.name && touched.name;
  const isErrorDescription = errors.description && touched.description;
  return (
    <Form onSubmit={handleSubmit} className={styles.form}>
      <div
        className={`${styles.fieldBlock} ${isErrorName && styles.formError}`}
      >
        <div className={styles.title}>
          Имя <span>*</span>
        </div>
        <Field
          type='text'
          onChange={handleChange}
          placeholder='Введите имя категории'
          name='name'
          validate={validateName}
        />
        {isErrorName && <div className={styles.error}>{errors.name}</div>}
      </div>
      <div
        className={`${styles.fieldBlock} ${
          isErrorDescription && styles.formError
        }`}
      >
        <div className={styles.title}>Описание</div>
        <Field
          component='textarea'
          name='description'
          placeholder='Введите описание категории'
          onChange={handleChange}
          validate={validateDescCategory}
        />
        {isErrorDescription && (
          <div className={styles.error}>{errors.description}</div>
        )}
      </div>
      {children}
    </Form>
  );
};
