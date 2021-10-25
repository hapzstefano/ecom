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
          <Navbar />
          <Home />
        </Route>
        <Route exact path="/login">
          <Navbar />
          <SignIn />
        </Route>
        <Route exact path="/register">
          <Navbar />
          <SignUp />
        </Route>
        <Route exact path="/home">
          <Redirect to="/" />
        </Route>
        <Route exact path="/logout">
          <Redirect to="/" />
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
