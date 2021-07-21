import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDBServiceCategories } from '../Service/IDBService';

export interface CategoryT {
  id: string;
  name: string;
  description: string;
}

const { insertValues, getData, updateData, deleteData } = IDBServiceCategories;

export const fetchCategoriesA = createAsyncThunk(
  'categories/fetch',
  async (data, thunkAPI) => {
    thunkAPI.dispatch(toggleIsLoadingCategory(true));
    try {
      return await getData();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    } finally {
      thunkAPI.dispatch(toggleIsLoadingCategory(false));
    }
  }
);

export const addCategoryA = createAsyncThunk(
  'category/add',
  async (newCategory: Omit<CategoryT, 'id'>, thunkAPI) => {
    thunkAPI.dispatch(toggleIsLoadingCategory(true));
    try {
      const newCategoryId = await insertValues(newCategory);
      thunkAPI.dispatch(closeModalWindowCategoryA())
      return { ...newCategory, id: newCategoryId };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    } finally {
      thunkAPI.dispatch(toggleIsLoadingCategory(false));
    }
  }
);
export const updateCategoryA = createAsyncThunk(
  'todos/edit',
  async (updatedTodo: CategoryT, thunkAPI) => {
    thunkAPI.dispatch(toggleIsLoadingCategory(true));
    try {
      await updateData(updatedTodo);
      thunkAPI.dispatch(closeModalWindowCategoryA())
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    } finally {
      thunkAPI.dispatch(toggleIsLoadingCategory(false));
    }
  }
);

export const deleteCategoryA = createAsyncThunk(
  'todo/delete',
  async (id: string, thunkAPI) => {
    thunkAPI.dispatch(toggleIsLoadingCategory(true));
    try {
      await deleteData(id);
      thunkAPI.dispatch(closeModalWindowCategoryA())
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    } finally {
      thunkAPI.dispatch(toggleIsLoadingCategory(false));
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    isCreateCategory: false,
    isEditCategory: null as null | CategoryT,
    isDeleteCategory: false,
    isLoadingCategories: false,
    categories: [] as CategoryT[]
  },
  reducers: {
    activeCreateCategoryA(state) {
      state.isCreateCategory = true;
    },
    activateEditCategory(state, action: PayloadAction<CategoryT>) {
      state.isEditCategory = action.payload;
    },
    activeDeleteCategoryA(state) {
      state.isDeleteCategory = true;
    },
    closeModalWindowCategoryA(state) {
      state.isCreateCategory = false;
      state.isEditCategory = null;
      state.isDeleteCategory = false;
    },
    toggleIsLoadingCategory(state, action: PayloadAction<boolean>) {
      state.isLoadingCategories = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchCategoriesA.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(addCategoryA.fulfilled, (state, action) => {
      state.categories.push(action.payload as CategoryT);
    });
    builder.addCase(updateCategoryA.fulfilled, (state, { meta: { arg } }) => {
      state.categories = state.categories.map(c => {
        return c.id === arg.id ? arg : c;
      });
    });
    builder.addCase(
      deleteCategoryA.fulfilled,
      (state, { meta: { arg: todoID } }) => {
        state.categories = state.categories.filter(({ id }) => id !== todoID);
        state.isDeleteCategory = false;
      }
    );
  }
});

export default categorySlice.reducer;
export const {
  activeCreateCategoryA,
  closeModalWindowCategoryA,
  activateEditCategory,
  activeDeleteCategoryA,
  toggleIsLoadingCategory
} = categorySlice.actions;
