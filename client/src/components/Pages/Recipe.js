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
    } else if (
      targetIngredient.marked === false ||
      targetIngredient.marked === undefined
    ) {
      targetIngredient.marked = true;
    }

    setRecipe(updatedRecipe);
  };

  const toggleMarkInstruction = (e) => {
    const updatedMarkedInstructions = [...markedInstructions];
    const targetInstructionIdx = e.target.dataset.idx;

    if (updatedMarkedInstructions[targetInstructionIdx] === true) {
      updatedMarkedInstructions[targetInstructionIdx] = false;
    } else if (updatedMarkedInstructions[targetInstructionIdx] === false) {
      updatedMarkedInstructions[targetInstructionIdx] = true;
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

  const createRecipeTags = recipe.tags.map((tag, idx) => {
    return (
      <p key={idx} className="padrighthalf marginbothalf">
        <button className="box-tag no-hover paddinghalf text-small" key={tag}>
          {tag}
        </button>
      </p>
    );
  });

  return (
    <Fragment>
      <div className="container-fullwidth--muted-light padbot2">
        <div className="container">
          <div className="padding1">
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
            <p className="text-small">{recipe.owner}</p>
          </div>
        </div>
        <div className="container">
          <div className="padding1 display-flex flex-wrap">
            {createRecipeTags}
          </div>
        </div>
      </div>

      {/* RecipeOptionsNav handles the recipe navigation (save, edit, delete) */}
      <RecipeOptionsNav
        isAuthenticated={isAuthenticated}
        user={user}
        recipe={recipe}
      ></RecipeOptionsNav>

      <div className="container-fullwidth">
        <div className="container">
          <h2>Ingredients</h2>
          <Fragment>
            {recipe.ingredients.map((ingredient, idx) => {
              return (
                <label
                  key={ingredient.ingredient}
                  className="container-checkbox"
                >
                  {ingredient.amount} {ingredient.ingredient}
                  <input type="checkbox"></input>
                  <span className="checkmark"></span>
                </label>
              );
            })}
          </Fragment>
        </div>

        <div className="container">
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
      </div>
    </Fragment>
  );
};

export default Recipe;
