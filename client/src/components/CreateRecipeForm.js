import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-wrapper";
// import API from "../utils/API";
import { useForm } from "react-hook-form";

const CreateRecipeForm = () => {
  const { isAuthenticated, user } = useAuth0();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data, e) => {
    console.log(data);
    e.target.reset();
  };

  return (
    <Fragment>
      {!isAuthenticated && <div>Please log in to create a recipe.</div>}
      {isAuthenticated && user && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Recipe Title"
            name="recipeTitle"
            ref={register({ required: true })}
          />
          <textarea
            type="text"
            placeholder="Recipe Description"
            name="recipeDescription"
            ref={register({ required: true })}
          ></textarea>
          <input type="submit" />
        </form>
      )}
    </Fragment>
  );
};

export default CreateRecipeForm;
