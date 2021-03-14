import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";
// import Home from "./components/Pages/Home";
// import Create from "./components/Pages/Create";
// import EditRecipe from "./components/Pages/EditRecipe";
// import Profile from "./components/Pages/Profile";
// import Recipe from "./components/Pages/Recipe";
// import Search from "./components/Pages/Search";
import "./App.css";

const Home = lazy(() => import("./components/Pages/Home"));
const Create = lazy(() => import("./components/Pages/Create"));
const EditRecipe = lazy(() => import("./components/Pages/EditRecipe"));
const Profile = lazy(() => import("./components/Pages/Profile"));
const Recipe = lazy(() => import("./components/Pages/Recipe"));
const Search = lazy(() => import("./components/Pages/Search"));

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <NavBar />
        </header>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/create" component={Create} />
            <Route path="/edit-recipe/:id" component={EditRecipe} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="/recipe/:id" component={Recipe} />
            <Route path="/search" component={Search} />
            <Route component={NoMatch} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

const NoMatch = ({ location }) => (
  <div>
    <h1>
      No match for <code>{location.pathname}</code>
    </h1>
  </div>
);

export default App;
