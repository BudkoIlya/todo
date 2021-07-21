import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from './tasks.module.scss';
import folderImg from '../../assets/imgs/folder.png';
import deleteImg from '../../assets/imgs/delete.png';
import editImg from '../../assets/imgs/edit.png';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import {
  activateEditTodoA,
  activeDeleteTodoA,
  closeModalWindowTodoA,
  deleteTodoA,
  TodoListT
} from '../../redux/todo-reducer';
import { CreateTodoAndCategory } from '../modalWindows/createWindow/createTodoAndCategory';
import { ConfirmDelete } from '../modalWindows/confirmDeleteWindow/confirmDelete';
import { Loading } from '../loading/loading';

export const Tasks: React.FC = () => {
  const [todoId, setTodoId] = useState<string | undefined>(undefined);
  const { isCreateTodo, isEditTodo, todos, isDeleteTodo, isLoadingTodo } =
    useSelector((state: RootState) => state.todoLists);

  const dispatch = useDispatch();
  const closeWindow = () => {
    dispatch(closeModalWindowTodoA());
  };
  const deleteTodo = () => {
    todoId && dispatch(deleteTodoA(todoId));
  };

  return (
    <div>
      {isDeleteTodo && (
        <ConfirmDelete
          closeWindow={closeWindow}
          deleteItem={deleteTodo}
          isLoading={isLoadingTodo}
        />
      )}
      {(isCreateTodo || isEditTodo) && <CreateTodoAndCategory />}
      {todos.map(todo => {
        return (
          <Todo
            todo={todo}
            key={todo.id}
            setTodoId={setTodoId}
            isLoadingTodo={isLoadingTodo}
          />
        );
      })}
    </div>
  );
};

const Todo: React.FC<TodoT> = ({ todo, setTodoId, isLoadingTodo }) => {
  const dispatch = useDispatch();
  const editTodo = () => {
    dispatch(activateEditTodoA(todo));
  };

  const activateDeleteTodo = () => {
    setTodoId(todo.id);
    dispatch(activeDeleteTodoA());
  };
  const { name, description, categoryId } = todo;
  const { categories } = useSelector((state: RootState) => state.categories);
  const requiredCategory = categories.find(({ id }) => categoryId === id);
  return (
    <>
      {isLoadingTodo && <Loading />}
      <div className={styles.todo}>
        <div className={styles.leftPart}>
          <div className={styles.task}>
            <div className={styles.taskName}>{name}</div>
            <div className={styles.category}>
              {requiredCategory?.name && <img src={folderImg} alt='category' />}
              <div className={styles.categoryDesc}>
                {requiredCategory?.name}
              </div>
            </div>
          </div>
          <div className={styles.description}>{description}</div>
        </div>
        <div className={styles.icons}>
          <img src={editImg} alt='edit' onClick={editTodo} />
          <img src={deleteImg} alt='delete' onClick={activateDeleteTodo} />
        </div>
      </div>
    </>
  );
};

type TodoT = {
  todo: TodoListT;
  setTodoId: Dispatch<SetStateAction<string | undefined>>;
  isLoadingTodo: boolean;
};
