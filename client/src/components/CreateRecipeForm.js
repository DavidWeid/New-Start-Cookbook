import React, { Fragment, useState } from "react";
import { useAuth0 } from "../react-auth0-wrapper";
import API from "../utils/API";
import { useForm } from "react-hook-form";
import "./CSS/createRecipeForm.css";

const CreateRecipeForm = () => {
  /*** Require User and Form ***/

  const { isAuthenticated, user } = useAuth0();
  const { register, handleSubmit } = useForm();

  /*** Create and set our states ***/

  // useState for recipe (obj) - title and description
  const [recipe, setRecipe] = useState({ title: "", description: "" });
  const handleRecipeChange = (e) =>
    setRecipe({ ...recipe, [e.target.name]: [e.target.value] });

  // useState for ingredients (array of objects) - ingredient and amount
  const blankIngredient = { ingredient: "", amount: "" };
  const [ingredients, setIngredients] = useState([{ ...blankIngredient }]);

  // useState for instructionSteeps (arrary) - STRING
  const [instructionSteps, setInstructionSteps] = useState([""]);

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

  // When User submits recipe
  const onSubmit = (data, e) => {
    const recipe = data;

    // Add user info to recipe (newly created recipes have one creator/owner)
    recipe.creator = user.email;
    recipe.owner = user.email;

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
        })
        .catch((err) => {
          console.log(err);
        });

      // Reset form / recipe state to blank
      setIngredients([{ ...blankIngredient }]);
      setRecipe({ title: "", description: "" });
      setInstructionSteps([""]);
    } else {
      console.log("Missing ingredient or amount or missing instruction step!");
      return;
    }
  };

  return (
    <Fragment>
      {!isAuthenticated && <div>Please log in to create a recipe.</div>}
      {isAuthenticated && user && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            id="title"
            value={recipe.title}
            onChange={handleRecipeChange}
            ref={register({ required: true })}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            id="description"
            value={recipe.description}
            onChange={handleRecipeChange}
            ref={register({ required: true })}
          />
          <input type="button" value="Add Ingredient" onClick={addIngredient} />

          {ingredients.map((val, idx) => {
            const ingredientId = `ingredients[${idx}].ingredient`;
            const amountId = `ingredients[${idx}].amount`;
            return (
              <div key={`ingredient-${idx}`}>
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
                  type="button"
                  value="Remove"
                  onClick={removeIngredient}
                  data-idx={idx}
                />
              </div>
            );
          })}

          <input
            type="button"
            value="Add Instruction Step"
            onClick={addInstructionStep}
          />

          {instructionSteps.map((val, idx) => {
            const instructionId = `instructionSteps[${idx}]`;
            return (
              <div key={`instruction-${idx}`}>
                <span>{idx + 1}</span>
                <input
                  type="text"
                  name={instructionId}
                  data-idx={idx}
                  placeholder="Instruction Step"
                  id={instructionId}
                  className="instructionStep"
                  value={instructionSteps[idx]}
                  onChange={handleInstructionStepChange}
                  ref={register()}
                />
                <input
                  type="button"
                  value="Remove"
                  onClick={removeInstruction}
                  data-idx={idx}
                />
              </div>
            );
          })}
          <input type="submit" value="Submit" />
        </form>
      )}
      <div>{recipe.title}</div>
      <div>{recipe.description}</div>
    </Fragment>
  );
};

export default CreateRecipeForm;
