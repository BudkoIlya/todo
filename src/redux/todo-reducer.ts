import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TodoListT {
  id: string;
  name: string;
  description: string;
  categoryId: string;
}

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    count: 0,
    isCreateTodo: false,
    isEditTodo: null as null | TodoListT,
    todo: [
      {
        id: 'todo1',
        name: 'name',
        description: 'description',
        categoryId: 'category1'
      },
      {
        id: 'todo2',
        name: 'name2',
        description: 'description',
        categoryId: 'category2'
      }
    ]
  },
  reducers: {
    activateCreateTodoA(state) {
      state.isCreateTodo = true;
    },
    activateEditTodoA(state, action) {
      state.isEditTodo = action.payload;
    },
    addTodoA: (state, action: PayloadAction<TodoListT>) => {
      state.todo.push(action.payload);
    },
    editTodoA: (state, { payload }: PayloadAction<TodoListT>) => {
      state.todo = state.todo.map(el => {
        return el.id === payload.id ? payload : el;
      });
    },
    deleteTodoA: (state, action: PayloadAction<string>) => {
      state.todo = state.todo.filter(({ id }) => id !== action.payload);
    },
    cancelA(state) {
      state.isCreateTodo = false;
      state.isEditTodo = null;
    }
  }
});

export default todoSlice.reducer;
export const {
  activateCreateTodoA,
  cancelA,
  activateEditTodoA,
  addTodoA,
  editTodoA,
  deleteTodoA
} = todoSlice.actions;
