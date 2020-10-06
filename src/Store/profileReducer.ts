import {
  getProfile,
  getStatus,
  setStatus,
  uploadPhoto,
  setProfileInfo,
} from "../API/getApi";
import { stopSubmit } from "redux-form";
import {
  SET_PROFILE,
  SET_CURRENT_ID,
  ADD_POST,
  GET_STATUS,
  SET_STATUS,
  ADD_USER_PHOTO,
} from "./actionTypes";

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
  postText: [
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
type ContactsType = {
  github: string | null;
  vk: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  website: string | null;
  youtube: string | null;
  mainLinnk: string | null;
};
type PostType = {
  id: number;
  user: string;
  text: string;
};
export type InitStateType = typeof initialState;
const profileReducer = (state = initialState, action: any): InitStateType => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case SET_CURRENT_ID:
      return {
        ...state,
        currentID: action.id,
      };
    case ADD_POST:
      let newPost = {
        id: state.postText.length + 1,
        user: state.profile.fullName,
        text: action.post,
      };
      if (newPost.text && newPost.text.trim()) {
        return { ...state, postText: [newPost, ...state.postText] };
      }
      return state;
    case GET_STATUS:
      return { ...state, status: action.id };
    case SET_STATUS:
      return { ...state, status: action.status };
    case ADD_USER_PHOTO:
      return { ...state, profile: { ...state.profile, photos: action.photos } };
    default:
      return state;
  }
};

export const setProfile = (profile: ProfileType) => ({
  type: SET_PROFILE,
  profile,
});
export const setCurrentID = (id: number) => ({ type: SET_CURRENT_ID, id });
export const addPostAC = (post: PostType) => ({ type: ADD_POST, post });
//delete post
export const addPhoto = (photos: PhotosType) => ({
  type: ADD_USER_PHOTO,
  photos,
});
export const getStatusAC = (id: number) => ({ type: GET_STATUS, id });
export const setStatusAC = (status: string) => ({ type: SET_STATUS, status });

export const getPropfileThunk = (id: number) => async (dispatch: any) => {
  let data = await getProfile(id);
  dispatch(setProfile(data));
  dispatch(setCurrentID(id));
};
export const getStatusThunk = (id: number) => async (dispatch: any) => {
  let response = await getStatus(id);
  dispatch(setStatusAC(response.data));
};
export const setStatusThunk = (status: string) => async (dispatch: any) => {
  let response = await setStatus(status);
  if (response.data.resultCode === 0) {
    dispatch(setStatusAC(status));
  }
};
export const addPost = (post: PostType) => (dispatch: any) => {
  dispatch(addPostAC(post));
};
export const setProfilePhoto = (photo: any) => async (dispatch: any) => {
  let response = await uploadPhoto(photo);
  if (response.resultCode === 0) {
    dispatch(addPhoto(response.data.photos));
  }
};
export const setProfileData = (profileData: ProfileType) => async (
  dispatch: any,
  getState: any
) => {
  let id = getState().auth.id;
  let response = await setProfileInfo(profileData);
  if (response.data.resultCode === 0) {
    dispatch(getPropfileThunk(id));
  } else {
    let message = response.data.messages[0];
    dispatch(stopSubmit("profile-editor", { _error: message }));
    return Promise.reject(message);
  }
};

export default profileReducer;
