import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Pages/Home";
import Profile from "./components/Pages/Profile";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </div>
  );
}

const NoMatch = ({location}) => (
  <div>
    <h1>No match for <code>{location.pathname}</code></h1>
  </div>
)

export default App;
