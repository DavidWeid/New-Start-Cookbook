import React, { useState, useEffect, Fragment } from "react";
import API from "../../utils/API";
import "../CSS/pages.css";
import { useParams } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-wrapper";
import RecipeOptionsNav from "../RecipeOptionsNav";

const Recipe = () => {
  const params = useParams();
  const recipeId = params.id;

  const { isAuthenticated, user } = useAuth0();

  console.log(user);

  const [recipe, setRecipe] = useState({
    _id: "",
    creator: "",
    owner: "",
    title: "",
    description: "",
    ingredients: [],
    instructionSteps: [],
    tags: [],
  });

  const fetchRecipeById = async (recipeId) => {
    try {
      const recipe = await API.grabRecipeById(recipeId);
      console.log(recipe);
      setRecipe(recipe.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRecipeById(recipeId);
  }, [recipeId]);

  console.log(recipe);

  return (
    <div>
      <h1>Recipe Page</h1>
      {/* RecipeOptionsNav handles the recipe navigation (save, edit, delete) */}
      <RecipeOptionsNav
        isAuthenticated={isAuthenticated}
        user={user}
        recipe={recipe}
      ></RecipeOptionsNav>
      {/* Recipe Div (below) */}
      <div>
        <p>
          {recipe.title} by {recipe.owner}
        </p>
        <p>{recipe.description}</p>
        <div>
          <h2>Ingredients</h2>
          <Fragment>
            {recipe.ingredients.map((ingredient) => {
              return (
                <div key={ingredient.ingredient}>
                  <p>
                    {ingredient.amount} {ingredient.ingredient}
                  </p>
                </div>
              );
            })}
          </Fragment>
        </div>
        <div>
          <h2>Instructions</h2>
          <Fragment>
            {recipe.instructionSteps.map((instructionStep, idx) => {
              return (
                <div key={idx}>
                  <p>
                    {idx + 1}. {instructionStep}
                  </p>
                </div>
              );
            })}
          </Fragment>
        </div>
        <div>
          <h3>Tags</h3>
          <div>
            {recipe.tags.map((tag, idx) => {
              return <span key={idx}>{tag} </span>;
            })}
          </div>
        </div>
      </div>
      {/* Recipe Div End (above) */}
    </div>
  );
};

export default Recipe;
