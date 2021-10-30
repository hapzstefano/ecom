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
import Footer from "./components/Footer";
import MasterBrand from "./components/Pages/Masters/MasterBrand";
import MasterCategory from "./components/Pages/Masters/MasterCategory";
import MasterEmployee from "./components/Pages/Masters/MasterEmployee";
import MasterMember from "./components/Pages/Masters/MasterMember";
import MasterPromo from "./components/Pages/Masters/MasterPromo";
import MasterStock from "./components/Pages/Masters/MasterStock";
import ConfirmOrder from "./components/Pages/ConfirmOrder";
import Profile from "./components/Pages/Profile";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Navbar />
          <Home />
          <Footer />
        </Route>
        <Route exact path="/login">
          <Navbar />
          <SignIn />
          <Footer />
        </Route>
        <Route exact path="/register">
          <Navbar />
          <SignUp />
          <Footer />
        </Route>
        <Route exact path="/confirmorder">
          <Navbar />
          <ConfirmOrder />
          <Footer />
        </Route>
        <Route exact path="/masterbrand">
          <Navbar />
          <MasterBrand />
          <Footer />
        </Route>
        <Route exact path="/mastercategory">
          <Navbar />
          <MasterCategory />
          <Footer />
        </Route>
        <Route exact path="/masterpromo">
          <Navbar />
          <MasterPromo />
          <Footer />
        </Route>
        <Route exact path="/mastermember">
          <Navbar />
          <MasterMember />
          <Footer />
        </Route>
        <Route exact path="/masterstock">
          <Navbar />
          <MasterStock />
          <Footer />
        </Route>
        <Route exact path="/masteremployee">
          <Navbar />
          <MasterEmployee />
          <Footer />
        </Route>
        <Route exact path="/profile">
          <Navbar />
          <Profile />
          <Footer />
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
