import React, { Fragment, useState, useEffect } from "react";
import { useAuth0 } from "../../react-auth0-wrapper";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import Timers from "../Timers";
import "../assets/css/pages.css";

const Home = () => {
  const { isAuthenticated, user } = useAuth0();

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (user) {
        console.log(user);
        const recipes = await API.grabRecipesForUser(user.email);
        console.log(recipes);
        setRecipes(recipes.data);
      } else {
        console.log(`No user: ${user}`);
        const recipes = [];
        console.log(`No recipes: ${recipes}`);
        setRecipes([]);
      }
    };
    fetchRecipes();
  }, [user]);

  console.log(recipes);

  return (
    <Fragment>
      {!isAuthenticated && (
        <div>
          <h1>Please login to save and create recipes!</h1>
          <Link to="/search">Browse Recipes</Link>
          <Timers />
        </div>
      )}
      {isAuthenticated && user && (
        <div>
          <h1>Your Recipes</h1>
          <p>
            {recipes.length === 0
              ? "No recipes found"
              : `You have ${recipes.length} recipes saved.`}
          </p>
          {recipes.map((recipe) => {
            return (
              <div key={recipe._id}>
                <h2>{recipe.title}</h2>
                <p>Source: {recipe.owner}</p>
                <p>Description: {recipe.description}</p>
                <Link to={`/recipe/${recipe._id}`}>View Recipe</Link>
              </div>
            );
          })}
          <Link to="/create">Create</Link>
          <br />
          <Link to="/search">Search</Link>
          <br />
          {/* <Link to="/recipe/5eb583be4c50e059e0e2eeca">Unowned Recipe</Link> */}
        </div>
      )}
    </Fragment>
  );
};

export default Home;
