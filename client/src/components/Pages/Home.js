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
      } else {
        console.log(`No user: ${user}`);
        const recipes = []
        console.log(`No recipes: ${recipes}`)
        setRecipes([]);
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
            <div key={recipe[1] ? recipe._id : null}>
              <h1>{recipe.title}</h1>
              <p>Source: {recipe.owner}</p>
              <p>Description: {recipe.description}</p>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default Home;
