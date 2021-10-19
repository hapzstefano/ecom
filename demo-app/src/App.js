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
import NotFound from "./components/Pages/NotFound";
import SignIn from "./components/Pages/SignIn";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SignIn />
        </Route>
        <Route exact path="/buku">
          <h1>saya ga suka baca buku SE</h1>
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
