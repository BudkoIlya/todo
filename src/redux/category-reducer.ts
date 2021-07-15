import { createSlice } from '@reduxjs/toolkit';

export interface CategoryT {
  id: string;
  name: string;
  description: string;
}

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    isCreateCategory: false,
    categories: [
      {
        id: 'category1',
        name: 'name',
        description: 'description',
        categoryId: 'categoryId'
      },
      {
        id: 'category2',
        name: 'name2',
        description: 'description',
        categoryId: 'categoryId'
      }
    ]
  },
  reducers: {
    createCategory(state) {
      state.isCreateCategory = true;
    },
    cancelCreateCategory(state) {
      state.isCreateCategory = false;
    }
  }
});

export default categorySlice.reducer;
export const { createCategory, cancelCreateCategory } = categorySlice.actions;
