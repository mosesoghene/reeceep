import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://dummyjson.com/recipes');
      
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      
      const data = await response.json();
      return data.recipes;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  recipes: [],
  filteredRecipes: [],
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    filterRecipes: (state, action) => {
      const { searchTerm, searchTags } = action.payload;
      
      if (!searchTerm && !searchTags) {
        state.filteredRecipes = state.recipes;
        return;
      }
      
      state.filteredRecipes = state.recipes.filter((recipe) => {
        const nameMatch = searchTerm 
          ? recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) 
          : true;
        
        const tagMatch = searchTags
          ? recipe.tags.some((tag) => tag.toLowerCase().includes(searchTags.toLowerCase()))
          : true;
        
        return nameMatch && tagMatch;
      });
    },
    resetFilters: (state) => {
      state.filteredRecipes = state.recipes;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.recipes = action.payload;
        state.filteredRecipes = action.payload;
      });
  },
});

export const { filterRecipes, resetFilters } = recipesSlice.actions;

export default recipesSlice.reducer;