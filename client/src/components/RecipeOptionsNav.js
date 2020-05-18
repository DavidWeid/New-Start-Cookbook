import React, { Fragment } from "react";
import API from "../utils/API";

const RecipeOptionsNav = (props) => {
  const recipe = props.recipe;
  const user = props.user;
  const isAuthenticated = props.isAuthenticated;

  const saveAsNewRecipe = () => {
    const newRecipe = recipe;
    newRecipe.owner = user.email;
    delete newRecipe._id;
    API.createNewRecipe(newRecipe)
      .then((response) => {
        console.log(response.data);
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
              <p>Delete</p>
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
