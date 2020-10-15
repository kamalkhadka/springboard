import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">
            Microblog
          </Link>
        </div>
        <ul className="nav navbar-nav">
          <li>
            <Link to="/new">Add a new post</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
