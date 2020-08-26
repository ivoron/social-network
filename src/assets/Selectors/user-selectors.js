import { createSelector } from "reselect";

export const getUsers = (state) => {
  return state.usersPage.users;
};
// export const getUsersSelector = createSelector (getUsers, (users) => {
//     return users
// })