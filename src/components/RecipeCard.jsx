"use client"

import { useState } from "react"

function RecipeCard({ recipe }) {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div className="recipe-card">
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
            e.target.src = "https://via.placeholder.com/300x200?text=No+Image"
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

      <button className="details-button" onClick={toggleDetails}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>

      {showDetails && (
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
  )
}

export default RecipeCard
