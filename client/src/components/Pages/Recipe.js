import React, { useState, useEffect, Fragment } from "react";
import API from "../../utils/API";
import "../assets/css/pages.css";
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
    tags: []
  });

  const [markedInstructions, setMarkedInstructions] = useState([]);

  const toggleMarkIngredient = (e) => {
    const updatedRecipe = { ...recipe };
    const targetIngredient = updatedRecipe.ingredients[e.target.dataset.idx];

    if (targetIngredient.marked === true) {
      targetIngredient.marked = false;
      console.log("target marked false");
    } else if (
      targetIngredient.marked === false ||
      targetIngredient.marked === undefined
    ) {
      targetIngredient.marked = true;
      console.log("target marked true");
    }

    setRecipe(updatedRecipe);
  };

  const toggleMarkInstruction = (e) => {
    const updatedMarkedInstructions = [...markedInstructions];
    const targetInstructionIdx = e.target.dataset.idx;

    if (updatedMarkedInstructions[targetInstructionIdx] === true) {
      updatedMarkedInstructions[targetInstructionIdx] = false;
      console.log("target marked false");
    } else if (updatedMarkedInstructions[targetInstructionIdx] === false) {
      updatedMarkedInstructions[targetInstructionIdx] = true;
      console.log("target marked true");
    }

    setMarkedInstructions(updatedMarkedInstructions);
  };

  const fetchRecipeById = async (recipeId) => {
    try {
      const recipe = await API.grabRecipeById(recipeId);
      console.log(recipe);
      setRecipe(recipe.data);
      const numInstructions = recipe.data.instructionSteps.length;
      let markedFalseArr = [];
      for (var i = 0; i < numInstructions; i++) {
        markedFalseArr.push(false);
      }
      setMarkedInstructions(markedFalseArr);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRecipeById(recipeId);
  }, [recipeId]);

  console.log(recipe);
  console.log(markedInstructions);

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
            {recipe.ingredients.map((ingredient, idx) => {
              return (
                <div key={ingredient.ingredient}>
                  <p
                    onClick={toggleMarkIngredient}
                    data-idx={idx}
                    className={ingredient.marked ? "marked" : "unmarked"}
                  >
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
                  <p
                    onClick={toggleMarkInstruction}
                    data-idx={idx}
                    className={markedInstructions[idx] ? "marked" : "unmarked"}
                  >
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
