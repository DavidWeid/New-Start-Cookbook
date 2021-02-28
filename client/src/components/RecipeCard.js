import React from "react";
import { Link } from "react-router-dom";
import "./assets/css/recipeCard.css";

const RecipeCard = (props) => {
  const recipe = props.recipe;
  const { _id, title, description, tags } = recipe;

  const displayTags = tags.map((tag, idx) => {
    const arr = [];

    if (idx < 3) {
      arr.push(
        <p key={idx} className="padsideshalf">
          {tag}
        </p>
      );
    }

    return arr;
  });

  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front display-flex justify-center align-center">
          <h2>{title}</h2>
        </div>
        <div className="flip-card-back display-flex flex-direction-column justify-space-between">
          <h3 className="padtop1 padbot1">{description}</h3>
          <p>
            <Link className="light-orange" to={`./recipe/${_id}`}>
              View
            </Link>
          </p>
          <div className="container display-flex">{displayTags}</div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
