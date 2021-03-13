import React, { useState, useEffect } from "react";
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
    source: "",
    tags: []
  });

  useEffect(() => {
    console.log("Using an effect");
    let isCancelled = false;

    const fetchRecipeById = async (recipeId) => {
      try {
        if (!isCancelled) {
          console.log("Making an API request");
          const recipe = await API.grabRecipeById(recipeId);
          console.log(recipe.data);
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

  useEffect(() => {
    const compareUserToOwner = () => {
      let userEmail = "";

      if (user) {
        userEmail = user.email;
        if (userEmail !== recipe.owner) {
          console.log("User Email doesn't match recipe owner.");
          history.push("/");
        } else {
          console.log("User Email matches recipe owner.");
          return;
        }
      } else {
        console.log("No user logged in");
      }
    };

    if (recipe.owner) {
      compareUserToOwner();
    }
  }, [user, recipe.owner, history]);

  const checkKeyDown = (e) => {
    if (e.code === "Enter") e.preventDefault();
  };

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

  const recipeTagDiv = recipe.tags.map((tag, idx) => {
    return (
      <p key={idx} className="padright1 marginbot1">
        <button
          type="button"
          data-idx={idx}
          onClick={removeTag}
          className="box-tag no-hover no-focus paddinghalf text-smaller"
        >
          {tag}
        </button>
      </p>
    );
  });

  return (
    <div className="container-fullheight--secondary-dark">
      <div className="container-fullwidth--muted-light padbot2">
        <div className="container">
          <div className="padding1">
            <h1 className="text-align-center">
              Make changes below to{" "}
              <span className="border-bot-2-dark">{recipe.title}</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="container-fullwidth--secondary-dark padtop2half padbot2half">
        <div className="recipe-page paddinghalf bg-muted-dark text-white more-rounded card-shadow-dark">
          <div className="container container-create-form padbot1">
            <form
              onSubmit={handleSubmit(onSubmit)}
              onKeyDown={(e) => checkKeyDown(e)}
            >
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
                    onChange={handleHeadingChange}
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
                    placeholder="Description (Required)"
                    id="description"
                    value={recipe.description}
                    onChange={handleHeadingChange}
                    ref={register({ required: true })}
                  />
                </fieldset>
              </div>

              <div className="container padbot2">
                <h2 className="text-orange">Ingredients</h2>
                {recipe.ingredients.map((ingredient, idx) => {
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
                        value={recipe.ingredients[idx].amount}
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
                        value={recipe.ingredients[idx].ingredient}
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
                {recipe.instructionSteps.map((instruction, idx) => {
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
                          value={recipe.instructionSteps[idx]}
                          onChange={handleInstructionChange}
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
                  onClick={addInstruction}
                >
                  Add Instruction
                </button>
              </div>

              <div className="container padbot2">
                <input
                  className="fullwidth"
                  onKeyUp={addTag}
                  type="text"
                  placeholder="Add comma-separated recipe tags"
                />

                <div className="padtop1 display-flex flex-wrap">
                  {recipe.tags.length === 0 ? (
                    <p className="opacity-0 padright1 marginbot1">
                      <button
                        type="button"
                        className="box-tag no-hover no-focus paddinghalf text-smaller"
                      >
                        M
                      </button>
                    </p>
                  ) : (
                    recipeTagDiv
                  )}
                </div>
              </div>
              <button
                className="btn-orange rounded"
                type="submit"
                value="Submit"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;
