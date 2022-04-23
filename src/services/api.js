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
    if (error.code === "ECONNABORTED") {
      store.commit("global/SET_LOADING", false);
      store.commit("global/SET_ERRORS", {
        type: "error",
        message: "ارتباط با سرور قطع است بعدا تلاش کنید",
      });
    }
    const originalRequest = error.config;
    if (error.response.status === 500 && !originalRequest._retry) {
      originalRequest._retry = true;
      return api(originalRequest);
    } else {
      store.commit("global/SET_LOADING", false);
      store.commit("global/SET_ERRORS", {
        type: "error",
        message: "خطا در ارتباط با سرور، دوباره تلاش کنید",
      });
      router.replace("/");
      return Promise.reject(error);
    }
  }
);

export default api;
