import { getAuthThunk } from "./authReducer";
import { InferActionTypes, BaseThunkType } from "./redux-store";

export type InitStateType = {
  appInit: boolean;
};

let initialState: InitStateType = {
  appInit: false,
};
const appReducer = (
  state = initialState,
  action: ActionTypes
): InitStateType => {
  switch (action.type) {
    case "SET_INITIAL":
      return { ...state, appInit: true };
    default:
      return state;
  }
};
type ActionTypes = InferActionTypes<typeof actions>;

export const actions = {
  setInitialApp: () =>
    ({
      type: "SET_INITIAL",
    } as const),
};

type ThunkType = BaseThunkType<ActionTypes>;

export const initialApp = (): ThunkType => async (dispatch) => {
  dispatch(getAuthThunk()).then(() => {
    dispatch(actions.setInitialApp());
  });
};
export default appReducer;
