import Vue from "vue";
import Vuex from "vuex";

// modules
import global from "./modules/global";
import auth from "./modules/auth";
import booking from "./modules/booking";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    global,
    auth,
    booking,
  },
});
