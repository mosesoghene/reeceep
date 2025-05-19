"use client"

import { useState, useEffect } from "react"
import "./App.css"
import RecipeList from "./components/RecipeList"
import SearchBar from "./components/SearchBar"

function App() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, [])

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/recipes");

      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }

      const data = await response.json();
      setRecipes(data.recipes);
      setFilteredRecipes(data.recipes);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (searchTerm, searchTags) => {
    if (!searchTerm && !searchTags) {
      setFilteredRecipes(recipes);
      return;
    }

    const filtered = recipes.filter((recipe) => {
      const nameMatch = searchTerm ? recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) : true

      const tagMatch = searchTags
        ? recipe.tags.some((tag) => tag.toLowerCase().includes(searchTags.toLowerCase()))
        : true

      return nameMatch && tagMatch
    })

    setFilteredRecipes(filtered)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Reeceep Platform</h1>
        <p>Find your next favorite meal</p>
      </header>

      <SearchBar onSearch={handleSearch} />

      {loading && <div className="loading">Loading recipes...</div>}

      {error && <div className="error">Error: {error}</div>}

      {!loading && !error && <RecipeList recipes={filteredRecipes} />}
    </div>
  )
}

export default App
