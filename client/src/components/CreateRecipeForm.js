import React, { Fragment, useState } from "react";
import { useAuth0 } from "../react-auth0-wrapper";
import API from "../utils/API";
import { useForm } from "react-hook-form";
import "./CSS/createRecipeForm.css";

const CreateRecipeForm = () => {
  const { isAuthenticated, user } = useAuth0();

  const { register, handleSubmit } = useForm();

  const [recipe, setRecipe] = useState({ title: "", description: "" });
  const handleRecipeChange = (e) =>
    setRecipe({ ...recipe, [e.target.name]: [e.target.value] });

  const blankIngredient = { ingredient: "", amount: "" };
  const [ingredients, setIngredients] = useState([{ ...blankIngredient }]);

  const blankInstructionStep = "";
  const [instructionSteps, setInstructionSteps] = useState([
    ...blankInstructionStep,
  ]);

  const addIngredient = () => {
    setIngredients([...ingredients, { ...blankIngredient }]);
  };

  const handleIngredientChange = (e) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[e.target.dataset.idx][e.target.className] =
      e.target.value;
    setIngredients(updatedIngredients);
  };

  const addInstructionStep = () => {
    setInstructionSteps([...instructionSteps, ...blankInstructionStep]);
  };

  const handleInstructionStepChange = (e) => {
    const updatedInstructionSteps = [...instructionSteps];
    updatedInstructionSteps[e.target.dataset.idx][e.target.className] =
      e.target.value;
    setInstructionSteps(updatedInstructionSteps);
  };

  const onSubmit = (data, e) => {
    console.log(data);
    console.log(e);
    console.log(JSON.stringify(data));
    console.log(user.email);

    const recipe = data;
    recipe.creator = user.email;
    recipe.owner = user.email;

    console.log(recipe);

    API.createNewRecipe(recipe)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setIngredients([{ ...blankIngredient }]);
    setRecipe({ title: "", description: "" });
  };

  return (
    <Fragment>
      {!isAuthenticated && <div>Please log in to create a recipe.</div>}
      {isAuthenticated && user && (
        /* {!isAuthenticated && ( */
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
              </div>
            );
          })}

          <input type="button" value="Add Instruction Step" onClick={addInstructionStep} />

          {instructionSteps.map((val, idx) => {
            const instructionId = `instructionSteps[${idx}]`;
            return (
              <div key={`instruction-${idx}`}>
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
