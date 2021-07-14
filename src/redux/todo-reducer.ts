import { createSlice } from '@reduxjs/toolkit';

let uniq = new Date().getTime();

export type TodoListT = {
  id: string;
  name: string;
  description: string;
  categoryId: string;
};

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    count: 0,
    isCreateTodo: false,
    isEditTodo: null,
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
    increment(state) {
      state.count = state.count + 1;
    },
    activateCreateTodoA(state) {
      state.isCreateTodo = true;
    },
    activateEditTodoA(state, action) {
      state.isEditTodo = action.payload;
    },
    addTodoA(state, action) {
      state.todo.push(action.payload);
    },
    editTodo(state, action) {},
    cancelA(state) {
      state.isCreateTodo = false;
      state.isEditTodo = null;
    }
  }
});

export default todoSlice.reducer;
export const {
  increment,
  activateCreateTodoA,
  cancelA,
  activateEditTodoA,
  addTodoA
} = todoSlice.actions;
