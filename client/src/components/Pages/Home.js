import React, { Fragment, useState, useEffect } from "react";
import { useAuth0 } from "../../react-auth0-wrapper";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import RecipeCard from "../RecipeCard.js";
import "../assets/css/pages.css";
import logo from "../assets/img/new-start-cookbook.svg";

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

  const displayRecipe = recipes.map((recipe) => {
    return (
      <div key={recipe._id} className="padding1 flip-card-container">
        <RecipeCard recipe={recipe} />
      </div>
    );
  });

  return (
    <Fragment>
      {/* If user isn't authenticated, need to login to save & create */}
      {!isAuthenticated && (
        <div className="container-fullwidth padtop1">
          <div className="container text-align-center ">
            <div className="display-flex justify-center padbot1">
              <img
                className="homepage-logo"
                src={logo}
                alt="New Start Cook Book - A Genius Cook with a Good Book"
                width="1333"
                height="1000"
                loading="eager"
              />
            </div>
            <h1>
              Please{" "}
              <Link
                to={""}
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
        </div>
      )}

      {/* If user is authenticated and user exists, show their recipes */}
      {isAuthenticated && user && (
        <Fragment>
          <div className="container-fullwidth--muted-light padtop1 padbot1">
            <div className="container text-align-center">
              <h1>Your Recipes</h1>
              <p>
                {recipes.length === 0
                  ? "No recipes found! Let's change that..."
                  : `You have ${recipes.length} recipes`}
              </p>
            </div>
          </div>

          <div className="container-fullwidth">
            <div className="container display-flex flex-wrap justify-center padtop1 padbot1">
              {displayRecipe}
            </div>

            <div className="container text-align-center padtop1 padbot1">
              <p>
                <Link to="/create" className="dark-green bold padbothalf">
                  Create a recipe{" "}
                </Link>
                or
                <Link to="/search" className="dark-green bold padbothalf">
                  {" "}
                  search for something new
                </Link>
              </p>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
