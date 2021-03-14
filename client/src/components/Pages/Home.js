import React, { lazy, Fragment, useState, useEffect, Suspense } from "react";
import { useAuth0 } from "../../react-auth0-wrapper";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import logo from "../assets/img/new-start-cookbook.svg";
import "../assets/css/pages.css";

const RecipeCard = lazy(() => import("../RecipeCard"));
const renderLoader = () => <p>Loading</p>;

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
        <Suspense fallback={renderLoader()}>
          <RecipeCard recipe={recipe} />
        </Suspense>
      </div>
    );
  });

  return (
    <Fragment>
      {/* If user isn't authenticated, need to login to save & create */}
      {!isAuthenticated && (
        <div className="container-fullwidth padtop1">
          <div className="container">
            <div className="display-flex justify-space-between padbot1">
              <div className="display-flex flex-direction-column justify-center align-start">
                <h1 className="homepage-header">New Start Cookbook</h1>
                <p className="padbothalf">
                  Browse, save, and create your next culinary masterpiece.
                </p>

                <div className="display-flex align-center">
                  <button
                    className="btn-dark-green rounded"
                    onClick={() => loginWithRedirect({})}
                  >
                    Log In
                  </button>

                  <p className="text-small padleft1 margin0">
                    <Link to="/search" className="btn-link dark-orange bold">
                      Browse Recipes
                    </Link>
                  </p>
                </div>
              </div>
              <div>
                <div className="hidden-large padtop1"></div>
                <img
                  className="homepage-logo"
                  src={logo}
                  alt="New Start Cookbook - A Genius Cook with a Good Book"
                  width="1333"
                  height="1000"
                  loading="eager"
                />
              </div>
            </div>
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
