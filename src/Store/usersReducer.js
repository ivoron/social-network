import { getUsers, followUser, unfollowUser } from "../API/getApi";
let initialState = {
  users: [
    {
      id: 1,
      followed: false,
      name: "Ilya Voronov",
      status: "hey there!",
      photos: { small: null, large: null },
    }
  ],
  currentPage: 1,
  totalCount: null,
  pageSize: 10,
  isLoading: false,
  followFetch: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FOLLOW":
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userID) {
            return { ...user, followed: true };
          }
          return user;
        }),
      };

    case "UNFOLLOW":
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userID) {
            return { ...user, followed: false };
          }
          return user;
        }),
      };
    case "SET-USERS":
      return {
        ...state,
        users: action.users,
      };
    case "SET-CURRENT-PAGE":
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case "SET-TOTAL-COUNT":
      return {
        ...state,
        totalCount: action.totalCount,
      };
    case "SET-LOADER":
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case "DISABLE-BTN":
      return {
        ...state,
        followFetch: action.isFetching
          ? [...state.followFetch, action.userID]
          : state.followFetch.filter((id) => id !== action.userID),
      };

    default:
      return state;
  }
};

export const follow = (userID) => ({ type: "FOLLOW", userID });
export const unfollow = (userID) => ({ type: "UNFOLLOW", userID });
export const setUsers = (users) => ({ type: "SET-USERS", users });
export const setCurrentPage = (currentPage) => ({
  type: "SET-CURRENT-PAGE",
  currentPage,
});
export const setTotalCount = (totalCount) => ({
  type: "SET-TOTAL-COUNT",
  totalCount,
});
export const followedToggle = (isFetching, userID) => ({
  type: "DISABLE-BTN",
  isFetching,
  userID,
});
export const setLoader = (isLoading) => ({ type: "SET-LOADER", isLoading });

export const getUsersThunk = (currentPage, pageSize) => (dispatch) => {
  dispatch(setLoader(true));
  getUsers(currentPage, pageSize).then((data) => {
    dispatch(setUsers(data.items));
    dispatch(setTotalCount(data.totalCount));
    dispatch(setLoader(false));
  });
};
export const followThunk = (id) => (dispatch) => {
  dispatch(followedToggle(true, id));
  followUser(id).then((data) => {
    dispatch(followedToggle(false, id));
    if (data.resultCode === 0) {
      dispatch(follow(id));
    }
  });
};
export const unfollowThunk = (id) => (dispatch) => {
  dispatch(followedToggle(true, id));
  unfollowUser(id).then((data) => {
    dispatch(followedToggle(false, id));
    if (data.resultCode === 0) {
      dispatch(unfollow(id));
    }
  });
};

export default usersReducer;
