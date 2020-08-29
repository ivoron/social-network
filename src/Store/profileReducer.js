import {
  getProfile,
  getStatus,
  setStatus,
  uploadPhoto,
  setProfileInfo,
} from "../API/getApi";
import { stopSubmit } from "redux-form";

let initialState = {
  profile: {
    userId: 1,
    fullName: "Ilya Voronov",
    photos: {
      small: null,
      large: null,
    },
    aboutMe: "its me",
    contacts: {},
  },
  status: "",
  currentID: 10925,
  postText: [
    { id: 1, user: "Reptiloid", text: "Почему так часто проподаешь" },
    { id: 2, user: "Johny", text: "Где деньги, Лебовски?" },
  ],
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET-PROFILE":
      return {
        ...state,
        profile: action.profile,
      };
    case "SET-CURRENT-ID":
      return {
        ...state,
        currentID: action.id,
      };
    case "ADD-POST":
      let newPost = {
        id: state.postText.length + 1,
        user: state.profile.fullName,
        text: action.post,
      };
      if (newPost.text && newPost.text.trim()) {
        let stateCopy = { ...state };
        stateCopy.postText.unshift(newPost);
        return stateCopy;
      }
      return state;
    case "GET-STATUS":
      return { ...state, status: action.id };
    case "SET-STATUS":
      return { ...state, status: action.status };
    case "ADD-USER-PHOTO":
      return { ...state, profile: { ...state.profile, photos: action.photos } };
    default:
      return state;
  }
};
export const setProfile = (profile) => ({ type: "SET-PROFILE", profile });
export const setCurrentID = (id) => ({ type: "SET-CURRENT-ID", id });
export const addPostAC = (post) => ({ type: "ADD-POST", post });
export const addPhoto = (photos) => ({ type: "ADD-USER-PHOTO", photos });
export const getStatusAC = (id) => ({ type: "GET-STATUS", id });
export const setStatusAC = (status) => ({ type: "SET-STATUS", status });

export const getPropfileThunk = (id) => (dispatch) => {
  getProfile(id).then((data) => {
    dispatch(setProfile(data));
    dispatch(setCurrentID(id));
  });
};
export const getStatusThunk = (id) => (dispatch) => {
  getStatus(id).then((response) => {
    dispatch(setStatusAC(response.data));
  });
};
export const setStatusThunk = (status) => (dispatch) => {
  setStatus(status).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setStatusAC(status));
    }
  });
};
export const addPost = (post) => (dispatch) => {
  dispatch(addPostAC(post));
};
export const setProfilePhoto = (photo) => (dispatch) => {
  uploadPhoto(photo).then((response) => {
    if (response.resultCode === 0) {
      dispatch(addPhoto(response.data.photos));
    }
  });
};
export const setProfileData = (profileData) => async (dispatch, getState) => {
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
