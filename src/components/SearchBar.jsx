"use client"

import { useDispatch, useSelector } from "react-redux"
import { setSearchTerm, setSearchTags, resetSearch } from "../store/slices/uiSlice"
import { filterRecipes, resetFilters } from "../store/slices/recipeSlice";

function SearchBar() {
  const dispatch = useDispatch();
  const { searchTerm, searchTags } = useSelector((state) => state.ui);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(filterRecipes({ searchTerm, searchTags }));
  };

  const handleReset = () => {
    dispatch(resetSearch());
    dispatch(resetFilters());
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
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
          <button type="button" className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;