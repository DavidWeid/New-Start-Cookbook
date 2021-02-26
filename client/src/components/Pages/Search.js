import React, { Fragment, useState, useEffect } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import "../assets/css/pages.css";

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const [recipeTags, setRecipeTags] = useState([]);
  const [matchingRecipes, setMatchingRecipes] = useState([]);

  useEffect(() => {
    fetchRecipeTags();
  }, []);

  const recipeFilterOnChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const input = inputValue.trim();
    if (input === "") {
      return;
    }
    fetchRecipesByTag(input);
    setInputValue("");
  };

  const fetchRecipeTags = async () => {
    try {
      const recipeData = await API.grabAllRecipeTags();
      const recipeTags = recipeData.data;
      setRecipeTags(recipeTags);
      return recipeTags;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRecipesByTag = async (inputValue) => {
    try {
      const recipesData = await API.grabAllRecipesByTag(inputValue);
      const recipes = recipesData.data;
      console.log(recipes);
      setMatchingRecipes(recipes);
      if (recipes.length === 0) {
        setMatchingRecipes(["No recipe found"]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const initialRecipeTags = recipeTags.map((tag) => {
    return (
      <p key={tag} onClick={() => fetchRecipesByTag(tag)}>
        {tag}
      </p>
    );
  });

  const resultsFromSearch = matchingRecipes.map((recipe, i) => {
    if (recipe._id) {
      return (
        <div key={recipe._id}>
          <h2>{recipe.title}</h2>
          <h3>{recipe.description}</h3>
          <p>
            Created by {recipe.creator}
            {recipe.creator === recipe.owner ? (
              <span></span>
            ) : (
              <span>, owned by {recipe.owner}</span>
            )}
          </p>
          <p>Tags: {recipe.tags.join(", ")}</p>
          <Link to={`/recipe/${recipe._id}`}>View</Link>
        </div>
      );
    } else {
      return (
        <div key={i}>
          <h2>No recipe found</h2>
          <p onClick={() => setMatchingRecipes([])}>Try searching by tags</p>
        </div>
      );
    }
  });

  return (
    <Fragment>
      <div className="container-fullwidth--muted-light padbot2">
        <div className="container">
          <div className="padding1">
            <h1>Find your new favorite food</h1>
            <p>
              Browse all recipes below by tag! Search for a specific tag or
              click any tag below to see relevant recipes.
            </p>
          </div>

          <div className="padding1">
            <form onSubmit={handleSubmit}>
              <div className="display-flex justify-center">
                <label htmlFor="recipe-search">
                  <span style={{ display: "none" }}>Search recipes by tag</span>
                </label>
                <input
                  className="rounded"
                  type="text"
                  value={inputValue}
                  onChange={recipeFilterOnChange}
                  placeholder="Search Recipes by tag"
                />
                <div className="padleft1">
                  <button
                    className="btn-dark rounded"
                    type="submit"
                    value="Submit"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="container-fullwidth padtop2">
        <div className="container">
          {matchingRecipes.length === 0 ? (
            <div>View receipes by tags: {initialRecipeTags}</div>
          ) : (
            <div>{resultsFromSearch}</div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Search;
