import { createSlice } from '@reduxjs/toolkit';
import { fetchRecipes } from './recipeSlice';

const initialState = {
  loading: false,
  error: null,
  expandedRecipeId: null,
  searchTerm: '',
  searchTags: '',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchTags: (state, action) => {
      state.searchTags = action.payload;
    },
    resetSearch: (state) => {
      state.searchTerm = '';
      state.searchTags = '';
    },
    toggleRecipeDetails: (state, action) => {
      state.expandedRecipeId = state.expandedRecipeId === action.payload ? null : action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  setSearchTerm, 
  setSearchTags, 
  resetSearch, 
  toggleRecipeDetails,
  clearError
} = uiSlice.actions;

export default uiSlice.reducer;