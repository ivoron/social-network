import * as axios from "axios";

//шаблон АПИ запроса
const axiosFetch = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": "3a2fa7ef-f2ac-41a7-8266-1ae5e11757c7",
  },
}); 
 // получение списка пользователей
export const getUsers = (currentPage, pageSize) => {
  let url = `users?page=${currentPage}&count=${pageSize}`;
  return axiosFetch.get(url).then((response) => response.data);
};
// запросы на подписку/отписку на выбранного пользователя
export const followUser = (id) => {
  let url = `follow/${id}`;
  return axiosFetch.post(url).then((response) => response.data);
};
export const unfollowUser = (id) => {
  let url = `follow/${id}`;
  return axiosFetch.delete(url).then((response) => response.data);
};
//получение профиля выбранного пользователя
export const getProfile = (id) => {
  let url = `profile/${id}`;
  return axiosFetch.get(url).then((response) => response.data);
};
// запрос авторизации на сайте
export const getAuth = () => {
  let url = "auth/me";
  return axiosFetch.get(url).then((response) => response.data);
};
// получение статуса текущего пользователя
export const getStatus = (id) => {
  let url = `profile/status/${id}`;
  return axiosFetch.get(url);
};
// изменение своего статуса
export const setStatus = (status) => {
  let url = "profile/status/";
  return axiosFetch.put(url, { status });
};
// вход в систему
export const getLogin = (
  email,
  password,
  rememberMe = false, // при необходимости
  captcha = null //при необходимости
) => {
  let url = "auth/login";
  return axiosFetch.post(url, { email, password, rememberMe, captcha });
};
//запрос капчи при неверном вводе логина или пароля
export const getCaptcha = () => {
  let url = "security/get-captcha-url";
  return axiosFetch.get(url).then((response) => response.data);
};
// запрос на выход из системы (удаление текущей сессии)
export const getLogOut = () => {
  let url = "auth/login";
  return axiosFetch.delete(url);
};
// загрузка фотографии пользователя
export const uploadPhoto = (photo) => {
  let url = "profile/photo";
  const formData = new FormData();
  formData.append("image", photo);
  return axiosFetch.put(url, formData).then((response) => response.data);
};
// изменение информации профиля пользователя (имя, о себе, контакты)
export const setProfileInfo = (profileData) => {
  let url = "profile";
  return axiosFetch.put(url, profileData);
};
