import { createSelector } from "reselect";
import {AppStateType} from "../../Store/redux-store"
// эксперементально, в этом объеме делать отдельные реселекты нет особого смысла


export const getUsers = (state: AppStateType) => {
  return state.usersPage.users;
};
// export const getUsersSelector = createSelector (getUsers, (users) => {
//     return users
// }) 