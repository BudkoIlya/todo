import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDBServiceTasks } from '../Service/IDBService';

export interface TodoListT {
  id: string;
  name: string;
  description: string;
  categoryId?: string;
}

const { getData, insertValues, deleteData, updateData } = IDBServiceTasks;

export const fetchTodosA = createAsyncThunk(
  'todos/fetch',
  async (data, thunkAPI) => {
    thunkAPI.dispatch(toggleIsLoading(true));
    try {
      return await getData();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    } finally {
      thunkAPI.dispatch(toggleIsLoading(false));
    }
  }
);

export const addTodoA = createAsyncThunk(
  'todos/add',
  async (newTodo: Omit<TodoListT, 'id'>, thunkAPI) => {
    thunkAPI.dispatch(toggleIsLoading(true));
    try {
      const todoId = await insertValues(newTodo);
      thunkAPI.dispatch(closeModalWindowTodoA());
      return { ...newTodo, id: todoId };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    } finally {
      thunkAPI.dispatch(toggleIsLoading(false));
    }
  }
);

export const deleteTodoA = createAsyncThunk(
  'todo/delete',
  async (id: string, thunkAPI) => {
    thunkAPI.dispatch(toggleIsLoading(true));
    try {
      await deleteData(id);
      thunkAPI.dispatch(closeModalWindowTodoA());
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    } finally {
      thunkAPI.dispatch(toggleIsLoading(false));
    }
  }
);

export const updateTodoA = createAsyncThunk(
  'todos/edit',
  async (updatedTodo: TodoListT, thunkAPI) => {
    thunkAPI.dispatch(toggleIsLoading(true));
    try {
      await updateData(updatedTodo);
      thunkAPI.dispatch(closeModalWindowTodoA());
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    } finally {
      thunkAPI.dispatch(toggleIsLoading(false));
    }
  }
);

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    count: 0,
    isCreateTodo: false,
    isEditTodo: null as null | TodoListT,
    isDeleteTodo: false,
    isLoadingTodo: false,
    todos: [] as TodoListT[]
  },
  reducers: {
    activateCreateTodoA(state) {
      state.isCreateTodo = true;
    },
    activateEditTodoA(state, action: PayloadAction<TodoListT>) {
      state.isEditTodo = action.payload;
    },
    activeDeleteTodoA(state) {
      state.isDeleteTodo = true;
    },
    closeModalWindowTodoA(state) {
      state.isCreateTodo = false;
      state.isEditTodo = null;
      state.isDeleteTodo = false;
    },
    toggleIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoadingTodo = action.payload;
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
    builder.addCase(
      deleteTodoA.fulfilled,
      (state, { meta: { arg: todoID } }) => {
        state.todos = state.todos.filter(({ id }) => id !== todoID);
        state.isDeleteTodo = false;
      }
    );
  }
});

export default todoSlice.reducer;
export const {
  activateCreateTodoA,
  closeModalWindowTodoA,
  activateEditTodoA,
  activeDeleteTodoA,
  toggleIsLoading
} = todoSlice.actions;
