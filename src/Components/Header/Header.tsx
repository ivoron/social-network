import React from "react";
import { NavLink } from "react-router-dom";
import SearchForm from "./SearchForm";
import { InjectedFormProps } from "redux-form";

export type MapPropsType = {
  isAuth: boolean;
  login: string | null;
};
export type DispatchPropsType = {
  logOutThunk: () => void;
};
export type FormDataType = {
  search: string;
};
const Header: React.FC<
  InjectedFormProps<FormDataType> & MapPropsType & DispatchPropsType
> = (props) => {
  const onSubmit = (formData: FormDataType) => {
    console.log(formData); // поиск по сайту на доработке
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
};
export default Header;
