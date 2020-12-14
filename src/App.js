import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';


const App = () => {
  
  const appId = "1586a118";
  const appKey = "9f303e7dc8f4caaa2f969a0349ca79f0";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken')

  useEffect(() =>{
    findRecipes();
  }, [query] );

  const findRecipes = async ( ) => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const newSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('')
  };

  return(
    <div className="App">
      <h1 className="h1" >Project App Name</h1>

      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={newSearch}/>
        <button className="search-button" type="submit">Search</button>
      </form>

      
    <div className="recipe-box">
      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))};
    </div>
    </div>
  )
}

export default App;
