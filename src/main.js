import Vue from "vue";
import App from "./App.vue";
import VueCookies from "vue-cookies";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// styles
require("./styles/main.css");

Vue.config.productionTip = false;
Vue.use(VueCookies, { expire: "30min" });

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
