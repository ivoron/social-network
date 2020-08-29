import React from "react";
import { NavLink } from "react-router-dom";
import SearchForm from "./SearchForm";

export default function Header(props) {
  const onSubmit = (formData) => {
    console.log(formData);
  };
  return (
    <div className="App-header">
      <header>
        <span> LOGO </span>
        <SearchForm onSubmit={onSubmit} />
        <div className="loginItem">
          {props.isAuth ? (
            <>
              <NavLink to="/profile/">{props.login} </NavLink>|
              <NavLink onClick={() => props.logOutThunk()} to="#">
                {" "}
                exit
              </NavLink>
            </>
          ) : (
            <NavLink to="/login/">Login</NavLink>
          )}
        </div>
      </header>
    </div>
  );
}
