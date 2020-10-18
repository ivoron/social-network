import { getAuth, getLogin, getLogOut, getCaptcha } from "../API/getApi";
import { stopSubmit } from "redux-form";
import { InferActionTypes, BaseThunkType } from "./redux-store";

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

const authReducer = (
  state = initialState,
  action: ActionTypes
): InitStateType => {
  switch (action.type) {
    case "SET_AUTH_DATA":
      return { ...state, ...action.payload, isAuth: action.isAuth };
    case "SET_CAPTCHA_URL":
      return { ...state, captchaUrl: action.captchaUrl };
    default:
      return state;
  }
};
type ActionTypes = InferActionTypes<typeof actions>;

export const actions = {
  setAuthData: (
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({
      type: "SET_AUTH_DATA",
      payload: { id, email, login },
      isAuth,
    } as const),
  setCaptchaUrl: (captchaUrl: string) =>
    ({
      type: "SET_CAPTCHA_URL",
      captchaUrl,
    } as const),
};

type ThunkType = BaseThunkType<ActionTypes | ReturnType< typeof stopSubmit>>

export const getAuthThunk = (): ThunkType => async (dispatch) => {
  let data = await getAuth();
  if (data.resultCode === 0) {
    let { id, login, email } = data.data;
    dispatch(actions.setAuthData(id, email, login, true));
  }
};
export const loginThunk = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
): ThunkType => async (dispatch) => {
  let response = await getLogin(email, password, rememberMe, captcha);
  if (response.data.resultCode === 0) {
    dispatch(getAuthThunk());
  } else {
    if (response.data.resultCode === 10) {
      let response = await getCaptcha();
      dispatch(actions.setCaptchaUrl(response.url));
    }
    let message = response.data.messages[0];
    dispatch(stopSubmit("login-form", { _error: message }));
  }
};
export const logOutThunk = (): ThunkType => async (dispatch) => {
  let response = await getLogOut();
  if (response.data.resultCode === 0) {
    let id = null,
      login = null,
      email = null;
    dispatch(actions.setAuthData(id, email, login, false));
  }
};

export default authReducer;
