import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className=" mx-auto flex justify-between items-center">
        <Link to="/">Home</Link>
        <div>
          <Link to="/profile">User Profile</Link>
          <span className="mx-4">|</span>
          <Link to="/history">History</Link>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;



