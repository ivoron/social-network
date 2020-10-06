import axios from "axios";
import { ProfileType, PhotosType } from "../Store/profileReducer";
import { UsersType } from "../Store/usersReducer";

//шаблон АПИ запроса

const axiosFetch = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "3a2fa7ef-f2ac-41a7-8266-1ae5e11757c7",
  },
});
// получение списка пользователей
export const getUsers = async (currentPage: number, pageSize: number) => {
  let url = `users?page=${currentPage}&count=${pageSize}`;
  const response = await axiosFetch.get<GetUsersType>(url);
  return response.data;
};
type GetUsersType = {
  items: Array<UsersType>;
  totalCount: number;
  error: null | string;
};
// запросы на подписку/отписку на выбранного пользователя
export const followUser = async (id: number) => {
  let url = `follow/${id}`;
  const response = await axiosFetch.post<FollowType>(url);
  return response.data;
};
type FollowType = {
  resultCode: number;
  messages: Array<string>;
  data: {};
};
export const unfollowUser = async (id: number) => {
  let url = `follow/${id}`;
  const response = await axiosFetch.delete<UnfollowType>(url);
  return response.data;
};
type UnfollowType = {
  resultCode: number;
  messages: Array<string>;
  data: {};
};
//получение профиля выбранного пользователя
export const getProfile = async (id: number) => {
  let url = `profile/${id}`;
  const response = await axiosFetch.get<ProfileType>(url);
  return response.data;
};
export const getAuth = async () => {
  let url = "auth/me";
  const response = await axiosFetch.get<GetAuthType>(url);
  return response.data;
};
export type GetAuthType = {
  data: {
    id: number;
    email: string;
    login: string;
  };
  resultCode: number;
  messages: Array<string>;
};
// получение статуса текущего пользователя
export const getStatus = (id: number) => {
  let url = `profile/status/${id}`;
  return axiosFetch.get<string>(url);
};
// изменение своего статуса
export const setStatus = (status: string) => {
  let url = "profile/status/";
  return axiosFetch.put<SetStatysType>(url, { status });
};
type SetStatysType = {
  resultCode: number;
  messages: Array<string>;
  data: {};
};
// вход в систему
export const getLogin = (
  email: string,
  password: string,
  rememberMe: boolean = false, // при необходимости
  captcha: null | string = null //при необходимости
) => {
  let url = "auth/login";
  return axiosFetch.post<GetLoginType>(url, {
    email,
    password,
    rememberMe,
    captcha,
  });
};
type GetLoginType = {
  resultCode: number;
  messages: Array<string>;
  data: {};
};
//запрос капчи при неверном вводе логина или пароля
export const getCaptcha = async () => {
  let url = "security/get-captcha-url";
  const response = await axiosFetch.get<getCaptchaType>(url);
  return response.data;
};
type getCaptchaType = {
  url: string;
};
// запрос на выход из системы (удаление текущей сессии)
export const getLogOut = () => {
  let url = "auth/login";
  return axiosFetch.delete<LogOutType>(url);
};
type LogOutType = {
  resultCode: number;
  messages: Array<string>;
  data: {};
};
// загрузка фотографии пользователя
export const uploadPhoto = async (photo: any) => {
  let url = "profile/photo";
  const formData = new FormData();
  formData.append("image", photo);
  const response = await axiosFetch.put<UploadPhotoType>(url, formData);
  return response.data;
};
type UploadPhotoType = {
  data: { photos: PhotosType };
  resultCode: number;
  messages: Array<string>;
};
// изменение информации профиля пользователя (имя, о себе, контакты)
export const setProfileInfo = (profileData: ProfileType) => {
  let url = "profile";
  return axiosFetch.put<SetProfileInfoType>(url, profileData);
};
type SetProfileInfoType = {
  resultCode: number;
  messages: Array<string>;
  data: {};
};
