import store from "@/store";
import router from "@/router";
import axios from "axios";

// ##########################################################################################
// #######################  create a new instance of axios  #################################
// ##########################################################################################
let api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || "http://localhost:3000/api",
});

api.interceptors.request.use((request) => {
  store.commit("global/SET_LOADING", true);
  return request;
});

api.interceptors.response.use(
  (response) => {
    store.commit("global/SET_LOADING", false);
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    if (error.response.status === 500 && !originalRequest._retry) {
      originalRequest._retry = true;
      return api(originalRequest);
    } else {
      router.replace("/");
      return Promise.reject(error);
    }
  }
);

export default api;
