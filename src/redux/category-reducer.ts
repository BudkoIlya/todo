import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IDBServiceCategories } from '../Service/IDBService';

export interface CategoryT {
  id: string;
  name: string;
  description: string;
}

const { insertValues } = IDBServiceCategories;

export const addCategoryA = createAsyncThunk(
  'category/add',
  async (newCategory: Omit<CategoryT, 'id'>, thunkAPI) => {
    try {
      const newCategoryId = await insertValues(newCategory);
      return { ...newCategory, id: newCategoryId };
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    isCreateCategory: false,
    isEditCategory: null as null | CategoryT,
    categories: [
      {
        id: 'category1',
        name: 'name',
        description: 'description'
      },
      {
        id: 'category2',
        name: 'name2',
        description: 'description2'
      }
    ]
  },
  reducers: {
    activeCreateCategoryA(state) {
      state.isCreateCategory = true;
    },
    closeModalWindowCategoryA(state) {
      state.isCreateCategory = false;
      state.isEditCategory = null;
    }
  },
  extraReducers: builder => {
    builder.addCase(addCategoryA.fulfilled, (state, action) => {
      state.categories.push(action.payload as CategoryT);
    });
  }
});

export default categorySlice.reducer;
export const { activeCreateCategoryA, closeModalWindowCategoryA } =
  categorySlice.actions;
