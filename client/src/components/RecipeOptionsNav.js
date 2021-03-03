import React, { Fragment, useState } from "react";
import API from "../utils/API";
import { useHistory } from "react-router-dom";
import ConfirmationBox from "./ConfirmationBox";

const RecipeOptionsNav = (props) => {
  const recipe = props.recipe;
  const user = props.user;
  const isAuthenticated = props.isAuthenticated;
  const history = useHistory();

  const [deleteConfirmation, setDeleteConfirmation] = useState("no");

  const renderRedirect = (url) => {
    history.push(url);
  };

  // Save Recipe as NEW with user's email as owner and redirect to new recipe page via new ID
  const saveAsNewRecipe = () => {
    const newRecipe = recipe;
    newRecipe.owner = user.email;
    delete newRecipe._id;
    API.createNewRecipe(newRecipe)
      .then((response) => {
        renderRedirect(`/recipe/${response.data._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const confirmDelete = () => {
    setDeleteConfirmation("yes");
  };

  const negateDelete = () => {
    console.log("Don't Delete Recipe");
    setDeleteConfirmation("no");
  };

  // Delete Recipe by ID and Redirect User to homepage
  const deleteRecipe = () => {
    console.log("Delete Recipe");
    const targetRecipeId = recipe._id;
    API.deleteRecipeById(targetRecipeId)
      .then((response) => {
        console.log(response);
        renderRedirect(`/`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Edit Recipe button Redirects User to an Edit page
  const editRecipe = () => {
    const targetRecipeId = recipe._id;
    renderRedirect(`/edit-recipe/${targetRecipeId}`);
  };

  // Display the recipe's navigation bar that changes based on user vs !user and if user, owner vs !owner
  return (
    <Fragment>
      {isAuthenticated && user ? (
        <div className="container-fullwidth--muted-dark">
          <div className="container display-flex justify-center">
            {user.email === recipe.owner ? (
              <Fragment>
                <button className="btn-orange rounded" onClick={editRecipe}>
                  Edit
                </button>
                <div className="padsideshalf"></div>
                <button
                  className="btn-muted-light rounded"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </Fragment>
            ) : (
              <Fragment>
                <button
                  className="btn-orange rounded"
                  onClick={saveAsNewRecipe}
                >
                  Save Recipe
                </button>
              </Fragment>
            )}
            {/* If user clicks on "Delete" button, show a confirmation box via setting deleteConfirmation to "yes". This is essentially a modal */}
            {deleteConfirmation === "no" ? (
              <Fragment></Fragment>
            ) : (
              <ConfirmationBox yes={deleteRecipe} no={negateDelete} />
            )}
          </div>
        </div>
      ) : (
        <div className="container-fullwidth--muted-dark">
          <div className="container">
            <p className="text-align-center text-small margin0">
              Please login to save this recipe.
            </p>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default RecipeOptionsNav;
