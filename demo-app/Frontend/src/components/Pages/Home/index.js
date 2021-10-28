import React, { useState, useEffect } from "react";
import { EncryptStorage } from "encrypt-storage";
import { useHistory } from "react-router-dom";
import ButtonRipple from "../../ButtonRipple";
import "./home.css";
const Home = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);
  return <div></div>;
};

export default Home;
