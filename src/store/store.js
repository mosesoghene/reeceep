import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from './slices/recipeSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    ui: uiReducer,
  },
});