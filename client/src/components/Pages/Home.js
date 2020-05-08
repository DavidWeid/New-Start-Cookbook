import React, { Fragment, useState, useEffect } from "react";
import { useAuth0 } from "../../react-auth0-wrapper";
import API from "../../utils/API";
import "./Pages.css";

const Home = () => {
  const { isAuthenticated, user } = useAuth0();

  const [recipes, setRecipes] = useState([{}]);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (user) {
        console.log(user);
        const recipes = await API.grabRecipesForUser(user.email);
        console.log(recipes);
        setRecipes(recipes.data);
      }
    };
    fetchRecipes();
  }, [user]);

  return (
    <Fragment>
      {!isAuthenticated && <div>User Not Authenticated</div>}
      {isAuthenticated && user && <div>Welcome {user.name} </div>}
      <div>
        {recipes.map((recipe) => {
          return (
            <div key={recipe._id}>
              <h1>{recipe.title}</h1>
              <p>{recipe.owner}</p>
              <p>{recipe.description}</p>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default Home;
