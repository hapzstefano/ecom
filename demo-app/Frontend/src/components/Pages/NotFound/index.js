import React, { useEffect } from "react";

import "./notfound.css";

const NotFound = () => {
  useEffect(() => {
    document.title = "404 Not Found";
  }, []);
  return (
    <div className="not-found">
      <div className="not-found-404">
        <h1
          style={{
            backgroundColor: "#81d2eb",
          }}
        >
          Oops!
        </h1>
      </div>
      <h2>Oops!</h2>
      <p>
        The page you are looking for might have been removed had its name
        changed or is temporarily unavailable.
      </p>
    </div>
  );
};

export default NotFound;
