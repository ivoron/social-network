import { getUsers, followUser, unfollowUser } from "../API/getApi";
import { PhotosType } from "./profileReducer";
import {
  FOLLOW,
  UNFOLLOW,
  SET_USERS,
  SET_CURRENT_PAGE,
  SET_TOTAL_COUNT,
  SET_LOADER,
  DISABLE_BTN,
} from "./actionTypes";

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

type InitStateType = {
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
  action: UnionActionTypes
): InitStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userID) {
            return { ...user, followed: true };
          }
          return user;
        }),
      };

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userID) {
            return { ...user, followed: false };
          }
          return user;
        }),
      };
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case SET_TOTAL_COUNT:
      return {
        ...state,
        totalCount: action.totalCount,
      };
    case SET_LOADER:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case DISABLE_BTN:
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

type UnionActionTypes = FollowType &
  UnfollowType &
  SetUsersType &
  SetCurrentPageType &
  SetTotalCountType &
  FollowedTogleType &
  SetLoaderType;
// c оператором | редьюсер не работает

interface FollowType {
  type: typeof FOLLOW;
  userID: number;
}
interface UnfollowType {
  type: typeof UNFOLLOW;
  userID: number;
}
interface SetUsersType {
  type: typeof SET_USERS;
  users: Array<UsersType>;
}
interface SetCurrentPageType {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
}
interface SetTotalCountType {
  type: typeof SET_TOTAL_COUNT;
  totalCount: number;
}
interface FollowedTogleType {
  type: typeof DISABLE_BTN;
  isFetching: boolean;
  userID: number;
}
interface SetLoaderType {
  type: typeof SET_LOADER;
  isLoading: boolean;
}

const follow = (userID: number): FollowType => ({
  type: FOLLOW,
  userID,
});

const unfollow = (userID: number): UnfollowType => ({
  type: UNFOLLOW,
  userID,
});

const setUsers = (users: Array<UsersType>): SetUsersType => ({
  type: SET_USERS,
  users,
});

export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

const setTotalCount = (totalCount: number): SetTotalCountType => ({
  type: SET_TOTAL_COUNT,
  totalCount,
});

const followedToggle = (
  isFetching: boolean,
  userID: number
): FollowedTogleType => ({
  type: DISABLE_BTN,
  isFetching,
  userID,
});

const setLoader = (isLoading: boolean): SetLoaderType => ({
  type: SET_LOADER,
  isLoading,
});

export const getUsersThunk = (currentPage: number, pageSize: number) => async (
  dispatch: any
) => {
  dispatch(setLoader(true));
  let data = await getUsers(currentPage, pageSize);
  dispatch(setUsers(data.items));
  dispatch(setTotalCount(data.totalCount));
  dispatch(setLoader(false));
};
export const followTrack = (id: number, followed: boolean) => async (
  dispatch: any
) => {
  dispatch(followedToggle(true, id));
  let data = await (followed ? unfollowUser(id) : followUser(id));
  if (data.resultCode === 0) {
    dispatch(followed ? unfollow(id) : follow(id));
  }
  dispatch(followedToggle(false, id));
};

export default usersReducer;
