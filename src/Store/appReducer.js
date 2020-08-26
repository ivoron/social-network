import { getAuthThunk } from "./authReducer";

let initialState = {
  appInit: false,
};
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET-INITIAL":
      return { ...state, appInit: true };
    default:
      return state;
  }
};
export const setInitialApp =  () => ({
  type: "SET-INITIAL",
});

export const initialApp = () => (dispatch) => {
    dispatch(getAuthThunk()).then(() => {
      dispatch(setInitialApp());
    });
  };
export default appReducer;
