import React, { useState } from 'react';
import './App.css';
import ClipLoader from "react-spinners/ClipLoader";  // Import Spinner
import { motion } from 'framer-motion'; // Import motion


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecepies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchStarted, setSearchStarted] = useState(false); // Track whether search has started

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleSearch = async () => {
    if (!searchTerm) return;

    setLoading(true);
    setSearchStarted(true); // Indicate search has started
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    const data = await res.json();
    setRecepies(data.meals || []);
    setLoading(false);
  }

  return (
    <div className="app">
      <header>
        <h1>🍽️ Recipe Finder</h1>
      </header>

      <div className="search-section">
        <input 
          type="text"
          placeholder="Search for recipes..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className={`results-section ${searchStarted ? 'active' : ''}`}>
        {loading ? (
          <div className="loading-container">
            <ClipLoader color="#ff7e5f" size={60} />
          </div>
        ) : searchStarted && recipes.length === 0 ? (
          <div className="no-recipes">
            <p>No recipes found. Try searching for something else! 🍔</p>
          </div>
        ) : (
          <div className="recipes-section">
            {recipes.map((recipe) => (
              <motion.div 
                key={recipe.idMeal} 
                className="recipe-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                <h3>{recipe.strMeal}</h3>
                <a href={recipe.strSource} target="_blank" rel="noopener noreferrer">
                  View Full Recipe
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <footer>
        © 2025 Aneesh | Built with ❤️ React
      </footer>
    </div>
  );
}

export default App;
