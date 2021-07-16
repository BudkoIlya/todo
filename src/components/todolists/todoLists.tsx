import React, { useEffect } from 'react';
import styles from './todoLists.module.css';
import folderImg from '../../assets/imgs/folder.png';
import deleteImg from '../../assets/imgs/deleteTodo.png';
import editImg from '../../assets/imgs/editTodo.png';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import {
  activateEditTodoA,
  deleteTodoA,
  fetchTodos,
  TodoListT
} from '../../redux/todo-reducer';
import { CreateEditTodo } from './createTodo/createTodo';

export const TodoLists: React.FC = () => {

  const { isCreateTodo, isEditTodo, todos } = useSelector(
    (state: RootState) => state.todoLists
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  },[]);

  return (
    <div>
      {(isCreateTodo || isEditTodo) && <CreateEditTodo />}
      {todos.map(todo => {
        return <TodoList todo={todo} key={todo.id} />;
      })}
    </div>
  );
};

const TodoList: React.FC<{ todo: TodoListT }> = ({ todo }) => {
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
  // имя категории нужно будет доаставть по ее айди
  return (
    <div className={styles.todo}>
      <div className={styles.leftPart}>
        <div className={styles.taskName}>
          <div>{name}</div>
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
