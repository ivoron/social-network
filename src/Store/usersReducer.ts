import { getUsers, followUser, unfollowUser } from "../API/getApi";
import { PhotosType } from "./profileReducer";
import { InferActionTypes, BaseThunkType } from "./redux-store";

let initialState: InitStateType = {
  users: [
    {
      id: 1,
      followed: false,
      name: "Ilya Voronov",
      status: "hey there!",
      photos: { small: null, large: null },
    }, // массив объектов с сервера
  ],
  currentPage: 1, // номер текущей страницы
  totalCount: 0, // общее число пользователей
  pageSize: 10, // колличество юзеров на одной странице
  isLoading: false, // индикатор лоадера
  followFetch: [], // id юзеров, на которых ушел запрос на подписку
};

export type InitStateType = {
  users: Array<UsersType>;
  currentPage: number;
  totalCount: number;
  pageSize: number;
  isLoading: boolean;
  followFetch: Array<number>;
};
export type UsersType = {
  id: number;
  followed: boolean;
  name: string;
  status: string;
  photos: PhotosType;
};

const usersReducer = (
  state = initialState,
  action: ActionTypes
): InitStateType => {
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
    case "SET_USERS":
      return {
        ...state,
        users: action.users,
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case "SET_TOTAL_COUNT":
      return {
        ...state,
        totalCount: action.totalCount,
      };
    case "SET_LOADER":
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case "DISABLE_BTN":
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
type ActionTypes = InferActionTypes<typeof actions>;
export const actions = {
  follow: (userID: number) => ({ type: "FOLLOW", userID } as const),

  unfollow: (userID: number) => ({ type: "UNFOLLOW", userID } as const),

  setUsers: (users: Array<UsersType>) =>
    ({ type: "SET_USERS", users } as const),

  setCurrentPage: (currentPage: number) =>
    ({ type: "SET_CURRENT_PAGE", currentPage } as const),

  setTotalCount: (totalCount: number) =>
    ({ type: "SET_TOTAL_COUNT", totalCount } as const),

  followedToggle: (isFetching: boolean, userID: number) =>
    ({ type: "DISABLE_BTN", isFetching, userID } as const),

  setLoader: (isLoading: boolean) =>
    ({ type: "SET_LOADER", isLoading } as const),
};
export const setCurrentPage = actions.setCurrentPage;

type ThunkType = BaseThunkType<ActionTypes>;
export const getUsersThunk = (
  currentPage: number,
  pageSize: number
): ThunkType => async (dispatch) => {
  dispatch(actions.setLoader(true));
  let data = await getUsers(currentPage, pageSize);
  dispatch(actions.setUsers(data.items));
  dispatch(actions.setTotalCount(data.totalCount));
  dispatch(actions.setLoader(false));
};
export const followTrack = (id: number, followed: boolean): ThunkType => async (
  dispatch
) => {
  dispatch(actions.followedToggle(true, id));
  let data = await (followed ? unfollowUser(id) : followUser(id));
  if (data.resultCode === 0) {
    dispatch(followed ? actions.unfollow(id) : actions.follow(id));
  }
  dispatch(actions.followedToggle(false, id));
};

export default usersReducer;
