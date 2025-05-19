"use client"

import { useState } from "react"

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchTags, setSearchTags] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchTerm, searchTags)
  }

  const handleReset = () => {
    setSearchTerm("")
    setSearchTags("")
    onSearch("", "")
  }

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
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter recipe name..."
            />
          </div>

          <div className="search-field">
            <label htmlFor="tag-search">Search by tag:</label>
            <input
              id="tag-search"
              type="text"
              value={searchTags}
              onChange={(e) => setSearchTags(e.target.value)}
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
  )
}

export default SearchBar
