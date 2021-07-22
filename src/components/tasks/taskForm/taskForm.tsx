import React, { useState } from 'react';
import styles from './taskForm.module.scss';
import { Field, Form, FormikProps } from 'formik';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux';
import {
  validateName,
  validateDescTask
} from '../../../validation/validation';
import { CategoryT } from '../../../redux/category-reducer';

export const TaskForm: React.FC<{ formikProps: FormikProps<any> }> = ({
  formikProps,
  children
}) => {
  const { errors, touched, handleSubmit } = formikProps;
  const isError = errors.name && touched.name;
  return (
    <Form onSubmit={handleSubmit}>
      <FirstFormsRow {...formikProps} />
      {isError && (
        <div id='categoryNameErr' style={{ color: 'red', fontSize: '12px' }}>
          {formikProps.errors.name}
        </div>
      )}
      <SecondFormsRow {...formikProps} />
      {children}
    </Form>
  );
};

const FirstFormsRow: React.FC<FormikProps<any>> = ({
  handleChange,
  errors,
  touched,
  values: { categoryId },
  setFieldValue
}) => {
  const { categories } = useSelector((state: RootState) => state.categories);
  const isError = errors.name && touched.name;
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const selectedCategoryById = categories.filter(
    (c: CategoryT) => c.id === categoryId
  )[0]?.name;
  return (
    <div className={styles.firstFormsRow}>
      <div className={`${styles.formName} ${isError && styles.formError}`}>
        <div className={styles.title}>
          Имя <span>*</span>
        </div>
        <Field
          type='text'
          onChange={handleChange}
          placeholder='Введите имя задачи'
          name='name'
          validate={validateName}
        />
      </div>
      <div className={styles.formName}>
        <div className={`${styles.title} ${styles.categoryTitle}`}>
          Категория
        </div>
        <div
          className={styles.customSelect}
          onClick={() => setOpenSelect(!openSelect)}
        >
          <div
            className={`${styles.selectTitle} ${openSelect && styles.active}`}
          >
            <div style={selectedCategoryById ? { color: 'black' } : undefined}>
              {selectedCategoryById || 'Выберите категорию'}
            </div>
            <div
              className={`${openSelect && styles.rotatedImg} ${styles.img}`}
            />
          </div>
          {openSelect && (
            <div className={styles.options}>
              <div onClick={() => setFieldValue('categoryId', '')}>
                Выберите категорию
              </div>
              {categories.map(({ id, name }) => (
                <div
                  className={`${
                    selectedCategoryById === name && styles.selected
                  }`}
                  onClick={() => setFieldValue('categoryId', id)}
                  key={id}
                >
                  {name}
                </div>
              ))}
            </div>
          )}
        </div>
        <Field
          component='select'
          name='categoryId'
          onChange={handleChange}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};

const SecondFormsRow: React.FC<FormikProps<any>> = ({
  handleChange,
  errors: { description },
  touched
}) => {
  const isError = description && touched.description;
  return (
    <div className={`${styles.secondFormsRow} ${isError && styles.formError}`}>
      <div className={styles.title}>Описание</div>
      <Field
        component='textarea'
        name='description'
        placeholder='Введите описание задачи'
        onChange={handleChange}
        validate={validateDescTask}
      />
      {isError && <div className={styles.error}>{description}</div>}
    </div>
  );
};
