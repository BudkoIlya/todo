import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todoReducer from './todo-reducer';
import categoryReducer from './category-reducer';

const rootReducer = combineReducers({
  todoLists: todoReducer,
  categories: categoryReducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
