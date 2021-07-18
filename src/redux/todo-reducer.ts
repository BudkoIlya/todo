import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDBService } from '../Service/IDBService';

export interface TodoListT {
  id: string;
  name: string;
  description: string;
  categoryId: string;
}

const DB = new IDBService();

export const fetchTodosA = createAsyncThunk(
  'todos/fetch',
  async (data, thunkAPI) => {
    try {
      return await DB.getData();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const addTodoA = createAsyncThunk(
  'todos/add',
  async (newTodo: Omit<TodoListT, 'id'>, thunkAPI) => {
    try {
      const todoId = await DB.insertValues(newTodo);
      return { ...newTodo, id: todoId };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const deleteTodoA = createAsyncThunk(
  'todo/delete',
  async (id: string, thunkAPI) => {
    try {
      await DB.deleteData(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const updateTodoA = createAsyncThunk(
  'todos/edit',
  async (updatedTodo: TodoListT, thunkAPI) => {
    try {
      await DB.updateData(updatedTodo);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
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
    builder.addCase(fetchTodosA.fulfilled, (state, action) => {
      state.todos = action.payload;
    });
    builder.addCase(addTodoA.fulfilled, (state, action) => {
      state.todos.push(action.payload as TodoListT);
    });
    builder.addCase(updateTodoA.fulfilled, (state, { meta: { arg } }) => {
      state.todos = state.todos.map(todo => {
        return todo.id === arg.id ? arg : todo;
      });
    });
    builder.addCase(deleteTodoA.fulfilled, (state, { meta: { arg: todoID } }) => {
      state.todos = state.todos.filter(({ id }) => id !== todoID);
    });
  }
});

export default todoSlice.reducer;
export const {
  activateCreateTodoA,
  cancelA,
  activateEditTodoA
  // addTodoA,
  // updateTodoA,
  // deleteTodoA
} = todoSlice.actions;
