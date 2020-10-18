import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css"
const Navbar = () => {
  return (
    <div className="navbar">
      <div>
        <NavLink to="/profile/">Profile</NavLink>
      </div>
      <div>
        <NavLink to="/dialogs/">Messages</NavLink>
      </div>
      <div>
        <NavLink to="/users/">Users</NavLink>
      </div>
      <div>
        <NavLink to="/feed/">Feed</NavLink>
      </div>
      <div>
        <NavLink to="/music/">Music</NavLink>
      </div>
      <div>
        <NavLink to="/settings/">Settings</NavLink>
      </div>
    </div>
  );
};
export default Navbar;
