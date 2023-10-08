import React from "react";

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div id={"not-found"}>
      <h1>Page not found!</h1>
      <Link to={"/"}>Insert PDF</Link>
    </div>
  );
}

export default NotFound;
