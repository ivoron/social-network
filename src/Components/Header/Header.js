import React from "react";
import { NavLink } from "react-router-dom";

export default function Header(props) {
  return (
    <div className="App-header">
      <header>
        <div>
          <span> LOGO </span>
          <input placeholder="поиск" />
          <button> найти </button>
        </div>
      </header>
      <div className="loginItem">
        {props.isAuth ? (
          <>
            <NavLink to="/profile/">{props.userName} </NavLink>|
            <NavLink onClick={()=> props.logOutThunk()} to="#"> exit</NavLink>
          </>
        ) : (
          <NavLink to="/login/">Login</NavLink>
        )}
      </div>
    </div>
  );
}
