"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchRecipes, filterRecipes, resetFilters } from "../slices/recipesSlice"
import { 
  setSearchTerm, 
  setSearchTags, 
  resetSearch, 
  toggleRecipeDetails 
} from "../slices/uiSlice"
import "./globals.css"

export default function RecipeApp() {
  const dispatch = useDispatch();
  const { filteredRecipes } = useSelector((state) => state.recipes);
  const { loading, error, searchTerm, searchTags, expandedRecipeId } = useSelector((state) => state.ui);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  function handleSearch(e) {
    e.preventDefault();
    dispatch(filterRecipes({ searchTerm, searchTags }));
  }

  function resetSearchHandler() {
    dispatch(resetSearch());
    dispatch(resetFilters());
  }

  function handleToggleRecipeDetails(id) {
    dispatch(toggleRecipeDetails(id));
  }

  if (loading) {
    return <div className="loading">Loading recipes...</div>
  }

  if (error) {
    return <div className="error">Error: {error}</div>
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Recipe Finder</h1>
        <p>Find your next favorite meal</p>
      </header>

      <div className="search-container">
        <form onSubmit={handleSearch}>
          <div className="search-inputs">
            <div className="search-field">
              <label htmlFor="name-search">Search by name:</label>
              <input
                id="name-search"
                type="text"
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                placeholder="Enter recipe name..."
              />
            </div>

            <div className="search-field">
              <label htmlFor="tag-search">Search by tag:</label>
              <input
                id="tag-search"
                type="text"
                value={searchTags}
                onChange={(e) => dispatch(setSearchTags(e.target.value))}
                placeholder="Enter tag (e.g., Italian, Dessert)..."
              />
            </div>
          </div>

          <div className="search-buttons">
            <button type="submit" className="search-button">
              Search
            </button>
            <button type="button" className="reset-button" onClick={resetSearchHandler}>
              Reset
            </button>
          </div>
        </form>
      </div>

      {filteredRecipes.length === 0 ? (
        <div className="no-recipes">No recipes found. Try a different search.</div>
      ) : (
        <div className="recipe-list">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <div className="recipe-header">
                <h2>{recipe.name}</h2>
                <div className="recipe-meta">
                  <span className="cuisine">{recipe.cuisine}</span>
                  <span className="difficulty">{recipe.difficulty}</span>
                  <span className="time">{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
                </div>
              </div>

              <div className="recipe-image-container">
                <img
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.name}
                  className="recipe-image"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=200&width=300"
                    e.target.alt = "Recipe image not available"
                  }}
                />
              </div>

              <div className="recipe-tags">
                {recipe.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="recipe-rating">
                <span>★ {recipe.rating.toFixed(1)}</span>
                <span className="reviews">({recipe.reviewCount} reviews)</span>
              </div>

              <button 
                className="details-button" 
                onClick={() => handleToggleRecipeDetails(recipe.id)}
              >
                {expandedRecipeId === recipe.id ? "Hide Details" : "Show Details"}
              </button>

              {expandedRecipeId === recipe.id && (
                <div className="recipe-details">
                  <div className="ingredients">
                    <h3>Ingredients</h3>
                    <ul>
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="instructions">
                    <h3>Instructions</h3>
                    <ol>
                      {recipe.instructions.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="additional-info">
                    <p>Calories: {recipe.caloriesPerServing} per serving</p>
                    <p>Servings: {recipe.servings}</p>
                    <p>Meal Type: {recipe.mealType.join(", ")}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}