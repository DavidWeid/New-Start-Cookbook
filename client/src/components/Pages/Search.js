import React, { Fragment, useState, useEffect } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
// import RecipeCard from "../RecipeCard";
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
    const input = inputValue.trim().toLowerCase();
    if (input === "") {
      return;
    }

    fetchRecipesByTag(input);
    setInputValue("");
  };

  const returnToTags = () => {
    setMatchingRecipes([]);
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

  const initialRecipeTags = recipeTags.map((tag, idx) => {
    return (
      <p key={idx} className="padrighthalf">
        <button
          className="box-tag"
          key={tag}
          onClick={() => fetchRecipesByTag(tag)}
        >
          {tag}
        </button>
      </p>
    );
  });

  const resultsFromSearch = matchingRecipes.map((recipe, i) => {
    if (recipe._id) {
      const createRecipeTags = recipe.tags.map((tag, idx) => {
        return (
          <p key={idx} className="padrighthalf marginbothalf">
            <button
              className="box-tag no-hover no-focus paddinghalf text-smaller"
              key={tag}
            >
              {tag}
            </button>
          </p>
        );
      });

      return (
        <div key={recipe._id} className="padbot2 search-result-card-container">
          <div className="padding1 rounded card card-shadow display-flex flex-direction-column justify-space-between">
            <h2 className="text-dark-green">{recipe.title}</h2>
            <h3>{recipe.description}</h3>
            <p className="text-smaller padbothalf">
              Created by {recipe.creator}
              {recipe.creator === recipe.owner ? (
                <span></span>
              ) : (
                <span>, owned by {recipe.owner}</span>
              )}
            </p>
            <div className="display-flex flex-wrap padbothalf">
              {createRecipeTags}
            </div>
            <div className="search-result-card-footer padtophalf">
              <p className="padtophalf margin0 text-align-center">
                <Link
                  className="dark-green padbothalf padsides1 semi-bold"
                  to={`/recipe/${recipe._id}`}
                >
                  View
                </Link>
              </p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div key={i} className="">
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
                  <span style={{ display: "none" }}>Find recipes by tag</span>
                </label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={recipeFilterOnChange}
                  placeholder="Find recipes by tag"
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
            <div className="display-flex flex-wrap">{initialRecipeTags}</div>
          ) : (
            <div>
              <div className="padbot2 display-flex justify-center">
                <button onClick={returnToTags} className="btn-orange rounded">
                  Try tags again
                </button>
              </div>
              <div className="padtop2 display-flex flex-wrap justify-space-between">
                {resultsFromSearch}
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Search;
