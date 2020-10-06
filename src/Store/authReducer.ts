import { getAuth, getLogin, getLogOut, getCaptcha } from "../API/getApi";
import { stopSubmit } from "redux-form";
import { SET_AUTH_DATA, SET_CAPTCHA_URL } from "./actionTypes";

type InitStateType = {
  id: null | number;
  login: null | string;
  email: null | string;
  isAuth: boolean;
  captchaUrl: null | string;
};
let initialState: InitStateType = {
  id: null,
  login: null,
  email: null,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action: any): InitStateType => {
  switch (action.type) {
    case SET_AUTH_DATA:
      return { ...state, ...action.payload, isAuth: action.isAuth };
    case SET_CAPTCHA_URL:
      return { ...state, captchaUrl: action.captchaUrl };
    default:
      return state;
  }
};
type SetAuthType = {
  type: typeof SET_AUTH_DATA;
  payload: dataType;
  isAuth: boolean;
};
type dataType = {
  id: number | null;
  email: string | null;
  login: string | null;
};
export const setAuthData = (
  id: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): SetAuthType => ({
  type: SET_AUTH_DATA,
  payload: { id, email, login },
  isAuth,
});

type SetCaptchaType = {
  type: typeof SET_CAPTCHA_URL;
  captchaUrl: string;
};
const setCaptchaUrl = (captchaUrl: string): SetCaptchaType => ({
  type: SET_CAPTCHA_URL,
  captchaUrl,
});
export const getAuthThunk = () => async (dispatch: any) => {
  let data = await getAuth();
  if (data.resultCode === 0) {
    let { id, login, email } = data.data;
    dispatch(setAuthData(id, email, login, true));
  }
};
export const loginThunk = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
) => async (dispatch: any) => {
  let response = await getLogin(email, password, rememberMe, captcha);
  if (response.data.resultCode === 0) {
    dispatch(getAuthThunk());
  } else {
    if (response.data.resultCode === 10) {
      let response = await getCaptcha();
      dispatch(setCaptchaUrl(response.url));
    }
    let message = response.data.messages[0];
    dispatch(stopSubmit("login-form", { _error: message }));
  }
};
export const logOutThunk = () => async (dispatch: any) => {
  let response = await getLogOut();
  if (response.data.resultCode === 0) {
    let id = null,
      login = null,
      email = null;
    dispatch(setAuthData(id, email, login, false));
  }
};

export default authReducer;
