import { getAuth, getLogin, getLogOut } from "../API/getApi";
import { stopSubmit } from "redux-form";
let initialState = {
  id: null,
  login: null,
  email: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET-AUTH-DATA":
      return { ...state, ...action.data, isAuth: action.isAuth };
    default:
      return state;
  }
};

export const setAuthData = (data, isAuth) => ({
  type: "SET-AUTH-DATA",
  data,
  isAuth,
});
export const getAuthThunk = () => (dispatch) => {
  return getAuth().then((data) => {
    if (data.resultCode === 0) {
      dispatch(setAuthData(data.data, true));
    }
  });
};
export const loginThunk = (email, password, rememberMe) => (dispatch) => {
  getLogin(email, password, rememberMe).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(getAuthThunk());
    } else {
      let message = response.data.messages[0];
      dispatch(stopSubmit("login-form", { _error: message }));
    }
  });
};
export const logOutThunk = () => (dispatch) => {
  getLogOut().then((responce) => {
    if (responce.data.resultCode === 0) {
      let data = { id: null, login: null, email: null };
      dispatch(setAuthData(data, false));
    }
  });
};

export default authReducer;
