import React, { useState, useEffect, Fragment } from "react";
import API from "../../utils/API";
import "../assets/css/pages.css";
import { useParams, useHistory } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-wrapper";
import { useForm } from "react-hook-form";

const EditRecipe = () => {
  const params = useParams();
  const recipeId = params.id;
  const history = useHistory();
  const { user } = useAuth0();
  const { register, handleSubmit } = useForm();

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

  useEffect(() => {
    console.log("Using an effect");
    let isCancelled = false;

    const fetchRecipeById = async (recipeId) => {
      try {
        if (!isCancelled) {
          console.log("Making an API request");
          const recipe = await API.grabRecipeById(recipeId);
          setRecipe(recipe.data);
        }
      } catch (err) {
        if (!isCancelled) {
          throw err;
        }
      }
    };

    fetchRecipeById(recipeId);

    return () => {
      isCancelled = true;
    };
  }, [recipeId]);

  //   useEffect(() => {
  //     const compareUserToOwner = () => {
  //       let userEmail = "";

  //       if (user) {
  //         userEmail = user.email;
  //         if (userEmail !== recipe.owner) {
  //           console.log("User Email doesn't match recipe owner.");
  //           history.push("/");
  //         } else {
  //           console.log("User Email matches recipe owner.");
  //           return;
  //         }
  //       } else {
  //         console.log("No user logged in");
  //       }
  //     };

  //     compareUserToOwner();
  //   }, [user, recipe.owner, history]);

  const handleHeadingChange = (e) => {
    const updatedRecipe = { ...recipe };
    updatedRecipe[e.target.id] = e.target.value;
    setRecipe(updatedRecipe);
  };

  const handleIngredientChange = (e) => {
    const updatedRecipe = { ...recipe };
    updatedRecipe.ingredients[e.target.dataset.idx][e.target.className] =
      e.target.value;
    setRecipe(updatedRecipe);
  };

  const removeIngredient = (e) => {
    const targetIngredientIndex = e.target.dataset.idx;
    const updatedRecipe = { ...recipe };
    if (updatedRecipe.ingredients.length > 1) {
      updatedRecipe.ingredients.splice(targetIngredientIndex, 1);
      setRecipe(updatedRecipe);
    } else {
      console.log("At least one ingredient required!");
      return;
    }
  };

  const addIngredient = () => {
    const updatedRecipe = { ...recipe };
    const foundMissingInput = updatedRecipe.ingredients.find(
      (ingredient) => ingredient.ingredient === "" || ingredient.amount === ""
    );

    if (foundMissingInput === undefined) {
      updatedRecipe.ingredients.push({ ingredient: "", amount: "" });
      setRecipe(updatedRecipe);
    } else {
      console.log("Missing input");
    }
  };

  const handleInstructionChange = (e) => {
    const updatedRecipe = { ...recipe };
    updatedRecipe.instructionSteps[e.target.dataset.idx] = e.target.value;
    setRecipe(updatedRecipe);
  };

  const removeInstruction = (e) => {
    const targetInstructionIndex = e.target.dataset.idx;
    const updatedRecipe = { ...recipe };
    if (updatedRecipe.instructionSteps.length > 1) {
      updatedRecipe.instructionSteps.splice(targetInstructionIndex, 1);
      setRecipe(updatedRecipe);
    } else {
      console.log("At least one instruction step required!");
    }
  };

  const addInstruction = () => {
    const updatedRecipe = { ...recipe };
    const foundMissingInput = updatedRecipe.instructionSteps.find(
      (instruction) => instruction === ""
    );

    if (foundMissingInput === undefined) {
      updatedRecipe.instructionSteps.push("");
      setRecipe(updatedRecipe);
    } else {
      console.log("Missing input");
    }
  };

  const removeTag = (e) => {
    const targetTagIndex = e.target.dataset.idx;
    const updatedRecipe = { ...recipe };
    updatedRecipe.tags.splice(targetTagIndex, 1);
    setRecipe(updatedRecipe);
  };

  const addTag = (e) => {
    if (e.which === 188 || e.which === 13) {
      let input = e.target.value.trim().split(",");
      if (input.length === 0 || input[0] === "") return;

      const newTag = input[0];
      const updatedRecipe = { ...recipe };
      updatedRecipe.tags.push(newTag);
      setRecipe(updatedRecipe);
      e.target.value = "";
    }
  };

  const onSubmit = () => {
    console.log(recipe);

    if (recipe.owner !== user.email) return;
    let currentIngredients = recipe.ingredients;
    let currentInstructions = recipe.instructionSteps;

    const foundMissingIngredient = currentIngredients.find(
      (ingredient) => ingredient.ingredient === "" || ingredient.amount === ""
    );
    const foundMissingInstruction = currentInstructions.find(
      (instruction) => instruction === ""
    );

    if (!foundMissingIngredient && !foundMissingInstruction) {
      API.updateRecipe(recipe)
        .then((response) => {
          console.log(response.data);
          history.push(`/recipe/${recipe._id}`);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Missing input found");
      return;
    }
  };

  return (
    <div>
      <Fragment>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            name="title"
            placeholder="Title (Required)"
            id="title"
            value={recipe.title}
            onChange={handleHeadingChange}
            ref={register({ required: true })}
          />
          <input
            type="text"
            name="description"
            placeholder="Description (Required)"
            id="description"
            value={recipe.description}
            onChange={handleHeadingChange}
            ref={register({ required: true })}
          />
          <Fragment>
            <h2>Ingredients: </h2>
            {recipe.ingredients.map((ingredient, idx) => {
              const ingredientId = `ingredients[${idx}].ingredient`;
              const amountId = `ingredients[${idx}].amount`;

              return (
                <div key={`ingredient-${idx}`}>
                  <input
                    type="text"
                    name={amountId}
                    data-idx={idx}
                    placeholder="Add amount"
                    id={amountId}
                    className="amount"
                    value={recipe.ingredients[idx].amount}
                    onChange={handleIngredientChange}
                    ref={register()}
                  />
                  <input
                    type="text"
                    name={ingredientId}
                    data-idx={idx}
                    placeholder="Add ingredient"
                    id={ingredientId}
                    className="ingredient"
                    value={recipe.ingredients[idx].ingredient}
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
              value="Add Ingredient"
              onClick={addIngredient}
            />
          </Fragment>
          <Fragment>
            <h2>Instructions: </h2>
            {recipe.instructionSteps.map((instruction, idx) => {
              const instructionId = `instructionSteps[${idx}]`;
              return (
                <div key={`instruction-${idx}`}>
                  <span>{idx + 1}</span>
                  <input
                    type="text"
                    name={instructionId}
                    data-idx={idx}
                    placeholder="Add step here"
                    id={instructionId}
                    className="instructionStep"
                    value={recipe.instructionSteps[idx]}
                    onChange={handleInstructionChange}
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
            <input
              type="button"
              value="Add Instruction Step"
              onClick={addInstruction}
            />
          </Fragment>
          <Fragment>
            <h2>Tags: </h2>
            {recipe.tags.map((tag, idx) => {
              return (
                <span key={idx} data-idx={idx} onClick={removeTag}>
                  {tag}{" "}
                </span>
              );
            })}
            <input
              onKeyUp={addTag}
              type="text"
              placeholder="Add comma-separated recipe tags"
            />
          </Fragment>
          <Fragment>
            <input type="submit" value="Submit" />
          </Fragment>
        </form>
      </Fragment>
    </div>
  );
};

export default EditRecipe;
