import { createSelector } from "reselect";
// эксперементально, в этом объеме делать отдельные реселекты нет особого смысла
export const getUsers = (state) => {
  return state.usersPage.users;
};
// export const getUsersSelector = createSelector (getUsers, (users) => {
//     return users
// }) 