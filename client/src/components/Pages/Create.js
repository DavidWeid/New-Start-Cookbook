import React from "react";
import CreateRecipeForm from "../CreateRecipeForm";
import "../assets/css/pages.css";

const Create = () => {
  return (
    <div className="container-fullheight--secondary-dark">
      <div className="container-fullwidth--muted-light padtop1 padbot1">
        <div className="container text-align-center">
          <h1>Create your next masterpiece</h1>
        </div>
      </div>

      <div className="container-fullwidth--secondary-dark padtop2half padbot2half">
        <div className="recipe-page paddinghalf bg-muted-dark text-white more-rounded card-shadow-dark">
          <div className="container container-create-form padbot1">
            <CreateRecipeForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
