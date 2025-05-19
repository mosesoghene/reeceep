import RecipeCard from "./RecipeCard"

function RecipeList({ recipes }) {
  if (recipes.length === 0) {
    return <div className="no-recipes">No recipes found. Try a different search.</div>
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}

export default RecipeList;