import { getUsers, followUser, unfollowUser } from "../API/getApi";
import { PhotosType } from "./profileReducer";
import { FOLLOW, UNFOLLOW, SET_USERS, SET_CURRENT_PAGE, SET_TOTAL_COUNT, SET_LOADER, DISABLE_BTN } from "./actionTypes";
let initialState: InitStateType = {
  users: [
    {
      id: 1,
      followed: false,
      name: "Ilya Voronov",
      status: "hey there!",
      photos: { small: null, large: null },
    },// массив объектов с сервера
  ],
  currentPage: 1, // номер текущей страницы
  totalCount: 0, // общее число пользователей
  pageSize: 10, // колличество юзеров на одной странице
  isLoading: false, // индикатор лоадера
  followFetch: [],// id юзеров, на которых ушел запрос на подписку
};
type InitStateType = {
  users: Array<UsersType>
  currentPage: number,
  totalCount: number,
  pageSize: number,
  isLoading: boolean,
  followFetch: Array<number>,
}
export type UsersType = {
  id: number
  followed: boolean
  name: string
  status: string
  photos: PhotosType
}
const usersReducer = (state = initialState, action: any): InitStateType => {
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

export const follow = (userID: number) => ({ type: FOLLOW, userID });
export const unfollow = (userID: number) => ({ type: UNFOLLOW, userID });
export const setUsers = (users: Array<UsersType>) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage: number) => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});
export const setTotalCount = (totalCount: number) => ({
  type: SET_TOTAL_COUNT,
  totalCount,
});
export const followedToggle = (isFetching: boolean, userID: number) => ({
  type: DISABLE_BTN,
  isFetching,
  userID,
});
export const setLoader = (isLoading: boolean) => ({ type: SET_LOADER, isLoading });

export const getUsersThunk = (currentPage: number, pageSize: number) => (dispatch: any) => {
  dispatch(setLoader(true));
  getUsers(currentPage, pageSize).then((data: any) => {
    dispatch(setUsers(data.items));
    dispatch(setTotalCount(data.totalCount));
    dispatch(setLoader(false));
  });
};
export const followTrack = (id: number, followed: boolean) => (dispatch: any) => {
  dispatch(followedToggle(true, id));
  (followed ? unfollowUser(id) : followUser(id)).then((data: any) => {
    dispatch(followedToggle(false, id));
    if (data.resultCode === 0) {
      dispatch(followed ? unfollow(id) : follow(id));
    }
  });
};

export default usersReducer;
