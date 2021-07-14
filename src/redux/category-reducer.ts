import { createSlice } from '@reduxjs/toolkit';

let uniq = new Date().getTime();
export type CategoryT = {
    id: string;
    name: string;
    description: string;
};

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