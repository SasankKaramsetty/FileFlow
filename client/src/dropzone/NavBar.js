import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHistory } from '@fortawesome/free-solid-svg-icons';
import "../styles/nav.css"
const NavBar = () => {
  return (
    <nav>
      <NavLink to="/" activeClassName="active-link">
        FileFlow
      </NavLink>
      <div>
        <NavLink to="/profile" activeClassName="active-link">
          <FontAwesomeIcon icon={faUser} /> 
        </NavLink>
        <NavLink to="/history" activeClassName="active-link">
          <FontAwesomeIcon icon={faHistory} /> 
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
