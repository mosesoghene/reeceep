"use client"

import { useState, useEffect } from "react"
import "./globals.css"

export default function RecipeApp() {
  const [recipes, setRecipes] = useState([])
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchName, setSearchName] = useState("")
  const [searchTag, setSearchTag] = useState("")
  const [expandedRecipeId, setExpandedRecipeId] = useState(null)

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch("https://dummyjson.com/recipes")
        if (!response.ok) {
          throw new Error("Failed to fetch recipes")
        }
        const data = await response.json()
        setRecipes(data.recipes)
        setFilteredRecipes(data.recipes)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [])

  function handleSearch(e) {
    e.preventDefault()

    if (!searchName && !searchTag) {
      setFilteredRecipes(recipes)
      return
    }

    const filtered = recipes.filter((recipe) => {
      const nameMatch = searchName ? recipe.name.toLowerCase().includes(searchName.toLowerCase()) : true

      const tagMatch = searchTag ? recipe.tags.some((tag) => tag.toLowerCase().includes(searchTag.toLowerCase())) : true

      return nameMatch && tagMatch
    })

    setFilteredRecipes(filtered)
  }

  function resetSearch() {
    setSearchName("")
    setSearchTag("")
    setFilteredRecipes(recipes)
  }

  function toggleRecipeDetails(id) {
    if (expandedRecipeId === id) {
      setExpandedRecipeId(null)
    } else {
      setExpandedRecipeId(id)
    }
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
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Enter recipe name..."
              />
            </div>

            <div className="search-field">
              <label htmlFor="tag-search">Search by tag:</label>
              <input
                id="tag-search"
                type="text"
                value={searchTag}
                onChange={(e) => setSearchTag(e.target.value)}
                placeholder="Enter tag (e.g., Italian, Dessert)..."
              />
            </div>
          </div>

          <div className="search-buttons">
            <button type="submit" className="search-button">
              Search
            </button>
            <button type="button" className="reset-button" onClick={resetSearch}>
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

              <button className="details-button" onClick={() => toggleRecipeDetails(recipe.id)}>
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
