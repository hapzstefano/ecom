import React from "react";

import "./notfound.css";

const NotFound = () => {
  return (
    <div
      className="not-found"
      style={{ backgroundImage: "url('/assets/images/global/drTirta.png')" }}
    >
      <div className="not-found-404">
        <h1
          style={{
            backgroundImage: "url('/assets/images/global/not_found.jpg')",
          }}
        >
          Oops!
        </h1>
      </div>
      <h2 style={{ color: "white" }}>TORONTOTIRTA</h2>
      <p style={{ color: "white" }}>
        {/* The page you are looking for might have been removed had its name
        changed or is temporarily unavailable. */}
        SIANG MENANGANI COVID MALAM BERGERAK DI MID
      </p>
    </div>
  );
};

export default NotFound;
