import React, { Fragment } from "react";
import API from "../utils/API";
import { useHistory } from "react-router-dom";

const RecipeOptionsNav = (props) => {
  const recipe = props.recipe;
  const user = props.user;
  const isAuthenticated = props.isAuthenticated;
  const history = useHistory();

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

  // Delete Recipe by ID and Redirect User to homepage
  const deleteRecipe = () => {
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

  return (
    <Fragment>
      {isAuthenticated && user ? (
        <Fragment>
          {user.email === recipe.owner ? (
            <div>
              <p>Edit</p>
              <input type="button" value="Delete" onClick={deleteRecipe} />
            </div>
          ) : (
            <div>
              <input type="button" value="Save" onClick={saveAsNewRecipe} />
            </div>
          )}
        </Fragment>
      ) : (
        <Fragment>
          <div>
            <p>Please login to save this recipe.</p>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default RecipeOptionsNav;
