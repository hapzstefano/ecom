import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import gsap from "gsap";
import $ from "jquery";
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
import ForgetPassword from "./components/Pages/ForgetPassword";

function App() {
  useEffect(() => {
    gsap.to("body", 0, { css: { visibility: "visible" } });
    const tl = gsap.timeline();
    tl.from(".Swiper", 0.75, {
      opacity: 0,
      y: -50,
    }).from(".overview-product-content", 0.5, {
      y: 150,
      ease: "power4.out",
      delay: 0,
      skewY: 11,
    });
  }, []);

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
        </Route>
        <Route exact path="/mastercategory">
          <Navbar />
          <MasterCategory />
        </Route>
        <Route exact path="/masterpromo">
          <Navbar />
          <MasterPromo />
        </Route>
        <Route exact path="/mastermember">
          <Navbar />
          <MasterMember />
        </Route>
        <Route exact path="/masterstock">
          <Navbar />
          <MasterStock />
        </Route>
        <Route exact path="/masteremployee">
          <Navbar />
          <MasterEmployee />
        </Route>
        <Route exact path="/profile">
          <Navbar />
          <Profile />
          <Footer />
        </Route>
        <Route exact path="/home">
          <Redirect to="/" />
        </Route>
        <Route exact path="/forgetpassword">
          <Navbar />
          <ForgetPassword />
          <Footer />
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
