import { getAuthThunk } from "./authReducer";
import { SET_INITIAL } from "./actionTypes";


export type InitStateType = {
  appInit: boolean
}
type InitStateAC = {
  type: typeof SET_INITIAL
}

let initialState: InitStateType = {
  appInit: false,
};
const appReducer = (state = initialState, action: any): InitStateType => {
  switch (action.type) {
    case SET_INITIAL:
      return { ...state, appInit: true };
    default:
      return state;
  }
};
export const setInitialApp =  (): InitStateAC => ({
  type: SET_INITIAL,
});

export const initialApp = () => (dispatch: any) => {
    dispatch(getAuthThunk()).then(() => {
      dispatch(setInitialApp());
    });
  };
export default appReducer;
