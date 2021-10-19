import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import React, { useState } from "react";
import "./App.css";

//pages
import NotFound from "./components/Pages/NotFound";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <h1>saya klebet pinter saya</h1>
        </Route>
        <Route exact path="/buku">
          <h1>saya ga suka baca buku SE</h1>
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
