import {
  getProfile,
  getStatus,
  setStatus,
  uploadPhoto,
  setProfileInfo,
} from "../API/getApi";
import { stopSubmit } from "redux-form";
import { InferActionTypes, BaseThunkType } from "./redux-store";

let initialState = {
  profile: {
    userId: 1,
    fullName: "Ilya Voronov",
    photos: {
      small: null,
      large: null,
    },
    contacts: {},
  } as ProfileType,
  status: "",
  currentID: 10925,
  postList: [
    { id: 1, user: "Reptiloid", text: "Почему так часто проподаешь" },
    { id: 2, user: "Johny", text: "Где деньги, Лебовски?" },
  ] as Array<PostType>,
};
export type ProfileType = {
  userId: number | null;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContactsType;
  photos: PhotosType;
};
export type PhotosType = {
  small: string | null;
  large: string | null;
};
export type ContactsType = {
  github: string | null;
  vk: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  website: string | null;
  youtube: string | null;
  mainLinnk: string | null;
};
export type PostType = {
  id: number;
  user: string;
  text: string;
};
export type InitStateType = typeof initialState;
const profileReducer = (
  state = initialState,
  action: ActionTypes
): InitStateType => {
  switch (action.type) {
    case "SET_PROFILE":
      return {
        ...state,
        profile: action.profile,
      };
    case "SET_CURRENT_ID":
      return {
        ...state,
        currentID: action.id,
      };
    case "ADD_POST":
      let newPost: PostType = {
        id: state.postList.length + 1,
        user: state.profile.fullName,
        text: action.postText,
      };
      if (newPost.text && newPost.text.trim()) {
        return { ...state, postList: [newPost, ...state.postList] };
      }
      return state;
    case "GET_STATUS":
      return { ...state, status: action.status };
    case "SET_STATUS":
      return { ...state, status: action.status };
    case "ADD_USER_PHOTO":
      return { ...state, profile: { ...state.profile, photos: action.photos } };
    default:
      return state;
  }
};

type ActionTypes = InferActionTypes<typeof actions>;

export const actions = {
  setProfile: (profile: ProfileType) =>
    ({ type: "SET_PROFILE", profile } as const),
  setCurrentID: (id: number) => ({ type: "SET_CURRENT_ID", id } as const),
  addPostAC: (postText: string) => ({ type: "ADD_POST", postText } as const),
  addPhoto: (photos: PhotosType) =>
    ({ type: "ADD_USER_PHOTO", photos } as const),
  getStatusAC: (status: string) => ({ type: "GET_STATUS", status } as const),
  setStatusAC: (status: string) => ({ type: "SET_STATUS", status } as const),
};

export type ThunkType = BaseThunkType<
  ActionTypes | ReturnType<typeof stopSubmit>
>;
export const setCurrentID = actions.setCurrentID;
export const getPropfileThunk = (id: number): ThunkType => async (dispatch) => {
  let data = await getProfile(id);
  dispatch(actions.setProfile(data));
  dispatch(actions.setCurrentID(id));
};
export const getStatusThunk = (id: number): ThunkType => async (dispatch) => {
  let response = await getStatus(id);
  dispatch(actions.setStatusAC(response.data));
};
export const setStatusThunk = (status: string): ThunkType => async (
  dispatch
) => {
  let response = await setStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(actions.setStatusAC(status));
  }
};
export const addPost = (postText: string): ThunkType => async (dispatch) => {
  dispatch(actions.addPostAC(postText));
};
export const setProfilePhoto = (photo: File): ThunkType => async (dispatch) => {
  let response = await uploadPhoto(photo);
  if (response.resultCode === 0) {
    dispatch(actions.addPhoto(response.data.photos));
  }
};
export const setProfileData = (profileData: ProfileType): ThunkType => async (
  dispatch,
  getState
) => {
  let id = getState().auth.id;
  let response = await setProfileInfo(profileData);
  if (response.data.resultCode === 0) {
    if (id != null) {
      dispatch(getPropfileThunk(id));
    } else {
      throw new Error("user id is null");
    }
  } else {
    let message = response.data.messages[0];
    dispatch(stopSubmit("profile-editor", { _error: message }));
    return Promise.reject(message);
  }
};

export default profileReducer;
