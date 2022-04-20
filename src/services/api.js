import axios from "axios";

// ##########################################################################################
// #######################  create a new instance of axios  #################################
// ##########################################################################################
let api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
