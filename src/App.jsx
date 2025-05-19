"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./App.css"
import RecipeList from "./components/RecipeList"
import SearchBar from "./components/SearchBar"
import { fetchRecipes } from "./store/slices/recipeSlice"

function App() {
  const dispatch = useDispatch();
  const { filteredRecipes } = useSelector((state) => state.recipes);
  const { loading, error } = useSelector((state) => state.ui);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <div className="app">
      <header className="header">
        <h1>Reeceep Platform</h1>
        <p>Find your next favorite meal</p>
      </header>

      <SearchBar />

      {loading && <div className="loading">Loading recipes...</div>}

      {error && <div className="error">Error: {error}</div>}

      {!loading && !error && <RecipeList recipes={filteredRecipes} />}
    </div>
  )
}

export default App