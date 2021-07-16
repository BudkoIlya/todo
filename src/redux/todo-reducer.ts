import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDBService } from '../Service/IDBService';

export interface TodoListT {
  id: string;
  name: string;
  description: string;
  categoryId: string;
}

const DB = new IDBService();

export const fetchTodos = createAsyncThunk(
  'todos/fetch',
  async () => await DB.getData()
);

export const addTodoA = createAsyncThunk(
  'todos/add',
  async (newTodo: Omit<TodoListT, 'id'>) => {
    const todoId = await DB.insertValues(newTodo);
    return { ...newTodo, id: todoId };
  }
);

export const updateTodoA = createAsyncThunk(
  'todos/edit',
  async (updatedTodo: TodoListT) => {
    return DB.updateData(updatedTodo);
  }
);

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    count: 0,
    isCreateTodo: false,
    isEditTodo: null as null | TodoListT,
    todos: [] as TodoListT[]
  },
  reducers: {
    activateCreateTodoA(state) {
      state.isCreateTodo = true;
    },
    activateEditTodoA(state, action) {
      state.isEditTodo = action.payload;
    },
    deleteTodoA: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(({ id }) => id !== action.payload);
    },
    cancelA(state) {
      state.isCreateTodo = false;
      state.isEditTodo = null;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
    });
    builder.addCase(addTodoA.fulfilled, (state, action) => {
      console.log('addTodoA', action);
      state.todos.push(action.payload as TodoListT);
    });
    builder.addCase(updateTodoA.fulfilled, (state, { meta: { arg } }) => {
      console.log('updateTodoA action', arg);
      state.todos = state.todos.map(todo => {
        return todo.id === arg.id ? arg : todo;
      });
    });
  }
});

export default todoSlice.reducer;
export const {
  activateCreateTodoA,
  cancelA,
  activateEditTodoA,
  // addTodoA,
  // updateTodoA,
  deleteTodoA
} = todoSlice.actions;
