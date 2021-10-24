import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import React, { useState } from "react";
import "./App.css";

//pages
import Navbar from "./components/Navbar";
import Home from "./components/Pages/Home";
import NotFound from "./components/Pages/NotFound";
import SignIn from "./components/Pages/SignIn";
import SignUp from "./components/Pages/SignUp";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <SignIn />
        </Route>
        <Route exact path="/register">
          <SignUp />
        </Route>
        <Route path="*">
          <Navbar />
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
