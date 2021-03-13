import React, { Fragment, useState } from "react";
import { useAuth0 } from "../react-auth0-wrapper";
import API from "../utils/API";
import { useForm } from "react-hook-form";
import "./assets/css/createRecipeForm.css";
// import { Redirect } from "react-router";

const CreateRecipeForm = () => {
  /*** Require User and Form ***/

  const { isAuthenticated, user } = useAuth0();
  const { register, handleSubmit } = useForm();

  /*** Create and set our states ***/

  // useState for recipe (obj) - title and description
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    source: ""
  });
  const handleRecipeChange = (e) =>
    setRecipe({ ...recipe, [e.target.name]: [e.target.value] });

  // useState for ingredients (array of objects) - ingredient and amount
  const blankIngredient = { ingredient: "", amount: "" };
  const [ingredients, setIngredients] = useState([{ ...blankIngredient }]);

  // useState for instructionSteeps (arrary) - STRING
  const [instructionSteps, setInstructionSteps] = useState([""]);

  // useState for tags (array) - STRING
  const [recipeTags, setRecipeTags] = useState([]);

  /*** Methods ***/

  // Add ingredient button adds inputs for next ingredient (can't add if any ingredient (ingredient or amount) is blank)
  const addIngredient = () => {
    let currentIngredients = ingredients;

    // if there is a blank input, this is true
    const foundMissingIngredient = currentIngredients.find(
      (ingredient) => ingredient.ingredient === "" || ingredient.amount === ""
    );

    // if no blank input found, we're good to go
    if (foundMissingIngredient === undefined) {
      setIngredients([...ingredients, { ...blankIngredient }]);
    } else {
      console.log("Missing ingredient or amount!");
      return;
    }
  };

  // Remove an ingredient's inputs, unless it's the only ingredient
  const removeIngredient = (e) => {
    const targetIngredientIndex = e.target.dataset.idx;
    if (ingredients.length > 1) {
      ingredients.splice(targetIngredientIndex, 1);
      setIngredients([...ingredients]);
    } else {
      console.log("At least one ingredient required!");
      return;
    }
  };

  // Set ingredient state as User types
  const handleIngredientChange = (e) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[e.target.dataset.idx][e.target.className] =
      e.target.value;
    setIngredients(updatedIngredients);
  };

  // Add instruction step button adds inputs for next instruction (can't add more steps if any step is blank)
  const addInstructionStep = () => {
    let currentInstructionSteps = instructionSteps;

    // if there is a blank input, this is true
    const foundMissingInstructionStep = currentInstructionSteps.find(
      (instruction) => instruction === ""
    );

    // if no blank input found, we're good to go
    if (foundMissingInstructionStep === undefined) {
      setInstructionSteps([...instructionSteps, ""]);
    } else {
      console.log("Missing an instruction step!");
      return;
    }
  };

  // Remove an ingredient's inputs, unless it's the only ingredient
  const removeInstruction = (e) => {
    const targetInstructionIndex = e.target.dataset.idx;
    if (instructionSteps.length > 1) {
      instructionSteps.splice(targetInstructionIndex, 1);
      setInstructionSteps([...instructionSteps]);
    } else {
      console.log("At least one instruction step required!");
      return;
    }
  };

  // Set instruction state as User types
  const handleInstructionStepChange = (e) => {
    const updatedInstructionSteps = [...instructionSteps];
    updatedInstructionSteps[e.target.dataset.idx] = e.target.value;
    setInstructionSteps(updatedInstructionSteps);
  };

  // Add recipe tags from single input - add new tags on "," or "enter"
  const onKeyUp = (e) => {
    if (e.which === 188 || e.which === 13) {
      let input = e.target.value.trim().split(",");
      if (input.length === 0 || input[0] === "") return;

      const newTag = input[0];
      setRecipeTags((recipeTags) => [...recipeTags, newTag]);
      e.target.value = "";
    }
  };

  const removeTag = (e) => {
    const targetTagIndex = e.target.dataset.idx;
    const updatedTags = [...recipeTags];
    updatedTags.splice(targetTagIndex, 1);
    setRecipeTags(updatedTags);
  };

  // When User submits recipe
  const onSubmit = (data, e) => {
    const recipe = data;

    // Add user info to recipe (newly created recipes have one creator/owner)
    // Add tags to recipe
    recipe.creator = user.email;
    recipe.owner = user.email;
    recipe.tags = recipeTags;

    console.log(recipe);

    // last check for any blank input fields (ingredient or instruction)
    let currentIngredients = ingredients;
    let currentInstructionSteps = instructionSteps;

    // if there is a blank input, this is true
    const foundMissingIngredient = currentIngredients.find(
      (ingredient) => ingredient.ingredient === "" || ingredient.amount === ""
    );
    const foundMissingInstructionStep = currentInstructionSteps.find(
      (instruction) => instruction === ""
    );

    // if no blank input found, we're good to go
    if (
      foundMissingIngredient === undefined &&
      foundMissingInstructionStep === undefined
    ) {
      // Send recipe to our API
      API.createNewRecipe(recipe)
        .then((response) => {
          console.log(response.data);
          // return <Redirect push to={{ pathname: response.data._id }} />;
        })
        .catch((err) => {
          console.log(err);
        });

      // Reset form / recipe state to blank
      setIngredients([{ ...blankIngredient }]);
      setRecipe({ title: "", description: "", source: "" });
      setInstructionSteps([""]);
      setRecipeTags([]);
    } else {
      console.log("Missing ingredient or amount or missing instruction step!");
      return;
    }
  };

  const recipeTagDiv = recipeTags.map((tag, idx) => {
    return (
      <p key={idx} className="padright1 marginbot1">
        <button
          type="button"
          data-idx={idx}
          onClick={removeTag}
          className="box-tag no-hover paddinghalf text-smaller"
        >
          {tag}
        </button>
      </p>
    );
  });

  return (
    <Fragment>
      {!isAuthenticated && <div>Please log in to create a recipe.</div>}
      {isAuthenticated && user && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container padbot2">
            <fieldset>
              <label className="text-small" htmlFor="title">
                Title
              </label>
              <input
                className="fullwidth margintophalf"
                type="text"
                name="title"
                placeholder="Title"
                id="title"
                value={recipe.title}
                onChange={handleRecipeChange}
                ref={register({ required: true })}
              />
            </fieldset>

            <fieldset>
              <label className="text-small" htmlFor="description">
                Description
              </label>
              <input
                className="fullwidth margintophalf"
                type="text"
                name="description"
                placeholder="Description"
                id="description"
                value={recipe.description}
                onChange={handleRecipeChange}
                ref={register({ required: true })}
              />
            </fieldset>

            <fieldset>
              <label className="text-small" htmlFor="title">
                Source Link (Optional)
              </label>
              <input
                className="fullwidth"
                type="text"
                placeholder="Source Link (Optional)"
                name="source"
                id="source"
                value={recipe.source}
                onChange={handleRecipeChange}
                ref={register()}
              />
            </fieldset>
          </div>

          <div className="container padbot2">
            <h2 className="text-orange">Ingredients</h2>
            {ingredients.map((val, idx) => {
              const ingredientId = `ingredients[${idx}].ingredient`;
              const amountId = `ingredients[${idx}].amount`;
              return (
                <div
                  className="flex-container-input-btn"
                  key={`ingredient-${idx}`}
                >
                  <input
                    type="text"
                    name={amountId}
                    data-idx={idx}
                    placeholder="Amount"
                    id={amountId}
                    className="amount"
                    value={ingredients[idx].amount}
                    onChange={handleIngredientChange}
                    ref={register()}
                  />

                  <input
                    type="text"
                    name={ingredientId}
                    data-idx={idx}
                    placeholder="Ingredient"
                    id={ingredientId}
                    className="ingredient"
                    value={ingredients[idx].ingredient}
                    onChange={handleIngredientChange}
                    ref={register()}
                  />

                  <button
                    type="button"
                    className="btn-muted-light rounded text-smaller"
                    onClick={removeIngredient}
                    data-idx={idx}
                  >
                    X
                  </button>
                </div>
              );
            })}

            <button
              type="button"
              className="btn-orange rounded"
              onClick={addIngredient}
            >
              Add Ingredient
            </button>
          </div>

          <div className="container padbot2">
            <h2 className="text-orange">Instructions</h2>
            {instructionSteps.map((val, idx) => {
              const instructionId = `instructionSteps[${idx}]`;
              return (
                <div key={`instruction-${idx}`}>
                  <p className="bold fit-content padsideshalf border-bot-2-light">
                    {idx + 1}
                  </p>
                  <div className="flex-container-textarea-btn">
                    <textarea
                      type="text"
                      name={instructionId}
                      data-idx={idx}
                      placeholder="Instruction Step"
                      id={instructionId}
                      className="instructionStep"
                      value={instructionSteps[idx]}
                      onChange={handleInstructionStepChange}
                      ref={register()}
                    ></textarea>

                    <button
                      type="button"
                      className="btn-muted-light rounded text-smaller"
                      onClick={removeInstruction}
                      data-idx={idx}
                    >
                      X
                    </button>
                  </div>
                </div>
              );
            })}

            <button
              type="button"
              className="btn-orange rounded"
              onClick={addInstructionStep}
            >
              Add Instruction
            </button>
          </div>

          <div className="container padbot2">
            <input
              className="fullwidth"
              onKeyUp={(e) => onKeyUp(e)}
              type="text"
              placeholder="Add comma-separated recipe tags"
            />

            <div className="padtop1 display-flex flex-wrap">
              {recipeTags.length === 0 ? (
                // Placeholder tag, hidden, when no tags
                <p className="opacity-0 padright1 marginbot1">
                  <button
                    type="button"
                    className="box-tag no-hover paddinghalf text-smaller"
                  >
                    M
                  </button>
                </p>
              ) : (
                recipeTagDiv
              )}
            </div>
          </div>

          <button className="btn-orange rounded" type="submit" value="Submit">
            Create Recipe
          </button>
        </form>
      )}
    </Fragment>
  );
};

export default CreateRecipeForm;
