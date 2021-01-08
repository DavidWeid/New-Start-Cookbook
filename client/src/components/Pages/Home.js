import React, { Fragment, useState, useEffect } from "react";
import { useAuth0 } from "../../react-auth0-wrapper";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import "../assets/css/pages.css";

const Home = () => {
  const { isAuthenticated, user } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (user) {
        console.log("User", user);
        const recipes = await API.grabRecipesForUser(user.email);
        console.log("Recipes", recipes);
        setRecipes(recipes.data);
      } else {
        console.log("No user, no recipes");
        setRecipes([]);
      }
    };
    fetchRecipes();
  }, [user]);

  return (
    <Fragment>
      {/* If user isn't authenticated, need to login to save & create */}
      {!isAuthenticated && (
        <div className="container text-align-center padtop1">
          <h1 className="text-muted-dark">
            Please{" "}
            <Link
              className="dark-green btn-link"
              onClick={() => loginWithRedirect({})}
            >
              log in
            </Link>{" "}
            to save and create recipes!
          </h1>
          Or you can
          <Link to="/search" className="dark-green bold padbothalf">
            {" "}
            start browsing recipes{" "}
          </Link>{" "}
          right away
        </div>
      )}

      {/* If user is authenticated and user exists, show their recipes */}
      {isAuthenticated && user && (
        <Fragment>
          <div className="container text-align-center padtop1">
            <h1 className="text-dark-green">Your Recipes</h1>
            <p>
              {recipes.length === 0
                ? "No recipes found! Let's change that..."
                : `You have ${recipes.length} recipes saved.`}
            </p>
          </div>

          <div className="container text-align-center padtop1 padbot1">
            {recipes.map((recipe) => {
              return (
                <div className="padtop1 padbot1" key={recipe._id}>
                  <h2>{recipe.title}</h2>
                  <p>{recipe.description}</p>
                  <Link to={`/recipe/${recipe._id}`} className="dark-green">
                    View
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="container text-align-center padtop1">
            <Link to="/create" className="dark-green bold padbothalf">
              Create a recipe{" "}
            </Link>
            or
            <Link to="/search" className="dark-green bold padbothalf">
              {" "}
              search for something new
            </Link>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
