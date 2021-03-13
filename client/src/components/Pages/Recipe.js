import React, { useState, useEffect, Fragment } from "react";
import API from "../../utils/API";
import "../assets/css/pages.css";
import { useParams } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-wrapper";
import RecipeOptionsNav from "../RecipeOptionsNav";
import { Link } from "react-router-dom";

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

  const createRecipeTags = recipe.tags.map((tag, idx) => {
    return (
      <p key={idx} className="padrighthalf marginbothalf">
        <button className="box-tag no-hover paddinghalf text-smaller" key={tag}>
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
            <p className="text-smaller">{recipe.owner}</p>
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

      <div className="container-fullwidth--secondary-dark padtop2half padbot2half">
        <div className="recipe-page paddinghalf bg-muted-dark text-white more-rounded card-shadow-dark">
          <div className="container">
            <h2 className="text-align-center text-orange padbothalf">
              Ingredients
            </h2>
            <Fragment>
              {recipe.ingredients.map((ingredient, idx) => {
                return (
                  <label
                    key={ingredient.ingredient}
                    className="container-checkbox opacity-85"
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
            <h2 className="text-align-center text-orange padbothalf">
              Instructions
            </h2>
            <Fragment>
              {recipe.instructionSteps.map((instructionStep, idx) => {
                return (
                  <label
                    key={idx}
                    className="container-checkbox opacity-85 padbothalf"
                  >
                    {instructionStep}
                    <input type="checkbox"></input>
                    <span className="checkmark">
                      <span>&nbsp;{idx + 1}</span>
                    </span>
                  </label>
                );
              })}
            </Fragment>
          </div>

          {recipe.source ? (
            <div className="container">
              <p className="text-smaller">
                <a
                  className="light-orange"
                  href={recipe.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Recipe Source
                </a>
              </p>
            </div>
          ) : (
            <Fragment></Fragment>
          )}
        </div>
      </div>
      <div className="container-fullwidth">
        <div className="container text-align-center padtop1 padbot1">
          <p className="margin0">
            <Link to="/create" className="dark-green bold padbothalf">
              Create a recipe{" "}
            </Link>
            or
            <Link to="/search" className="dark-green bold padbothalf">
              {" "}
              search for something new
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Recipe;
