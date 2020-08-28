import * as axios from "axios";

const axiosFetch = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "3a2fa7ef-f2ac-41a7-8266-1ae5e11757c7",
  },
});

export const getUsers = (currentPage, pageSize) => {
  let url = `users?page=${currentPage}&count=${pageSize}`;
  return axiosFetch.get(url).then((response) => response.data);
};
export const followUser = (id) => {
  let url = `follow/${id}`;
  return axiosFetch.post(url).then((response) => response.data);
};
export const unfollowUser = (id) => {
  let url = `follow/${id}`;
  return axiosFetch.delete(url).then((response) => response.data);
};
export const getProfile = (id) => {
  let url = `profile/${id}`;
  return axiosFetch.get(url).then((response) => response.data);
};
export const getAuth = () => {
  let url = "auth/me";
  return axiosFetch.get(url).then((response) => response.data);
};
export const getStatus = (id) => {
  let url = `profile/status/${id}`;
  return axiosFetch.get(url);
};
export const setStatus = (status) => {
  let url = "profile/status/";
  return axiosFetch.put(url, { status });
};
export const getLogin = (email, password, rememberMe = false, captcha = null) => {
  let url = "auth/login";
  return axiosFetch.post(url, { email, password, rememberMe, captcha });
};
export const getCaptcha = () => {
  let url = "security/get-captcha-url";
  return axiosFetch.get(url).then((response) => response.data);
};
export const getLogOut = () => {
  let url = "auth/login";
  return axiosFetch.delete(url);
};
export const uploadPhoto = (photo) => {
  let url = "profile/photo";
  const formData = new FormData();
  formData.append("image", photo);
  return axiosFetch.put(url, formData);
};
export const setProfileInfo = (profileData) => {
  let url = "profile";
  return axiosFetch.put(url, profileData);
};
