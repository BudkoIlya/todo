import React, { useEffect } from 'react';
import styles from './tasks.module.scss';
import folderImg from '../../assets/imgs/folder.png';
import deleteImg from '../../assets/imgs/deleteTodo.png';
import editImg from '../../assets/imgs/editTodo.png';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import {
  activateEditTodoA,
  deleteTodoA,
  fetchTodosA,
  TodoListT
} from '../../redux/todo-reducer';
import { CreateTodoAndCategory } from '../createTaskAndCategory/createTodoAndCategory';

export const Tasks: React.FC = () => {
  const { isCreateTodo, isEditTodo, todos } = useSelector(
    (state: RootState) => state.todoLists
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodosA());
  }, [dispatch]);

  return (
    <div>
      {(isCreateTodo || isEditTodo) && <CreateTodoAndCategory />}
      {todos.map(todo => {
        return <Todo todo={todo} key={todo.id} />;
      })}
    </div>
  );
};

const Todo: React.FC<{ todo: TodoListT }> = ({ todo }) => {
  const dispatch = useDispatch();
  const editTodo = () => {
    dispatch(activateEditTodoA(todo));
  };
  const deleteTodo = () => {
    dispatch(deleteTodoA(todo.id));
  };
  const { name, description, categoryId } = todo;
  const { categories } = useSelector((state: RootState) => state.categories);
  const requiredCategory = categories.find(({ id }) => categoryId === id);
  return (
    <div className={styles.todo}>
      <div className={styles.leftPart}>
        <div className={styles.task}>
          <div className={styles.taskName}>{name}</div>
          <div className={styles.category}>
            <img src={folderImg} alt='category' />
            <div className={styles.categoryDesc}>{requiredCategory?.name}</div>
          </div>
        </div>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={styles.icons}>
        <img src={editImg} alt='edit' onClick={editTodo} />
        <img src={deleteImg} alt='delete' onClick={deleteTodo} />
      </div>
    </div>
  );
};
