import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import cookies from "vue-cookies";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/HomeView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
  {
    path: "/booking/:matchId",
    name: "booking",
    component: () =>
      import(/* webpackChunkName: "booking" */ "../views/BookingView.vue"),
    beforeEnter: (to, from, next) => {
      if (store.state.booking.selectedMatch) {
        return next();
      } else {
        return next("/");
      }
    },
  },
  {
    path: "/booking/:matchId/:stageId",
    name: "stage",
    component: () =>
      import(/* webpackChunkName: "stage" */ "../views/StageView.vue"),
    beforeEnter: (to, from, next) => {
      if (
        store.getters["booking/getSelectedMatch"] &&
        store.getters["booking/getSelectedStadiumMap"]
      ) {
        return next();
      } else {
        return next("/");
      }
    },
  },
  {
    path: "/ticket",
    name: "ticket",
    component: () =>
      import(/* webpackChunkName: "stage" */ "../views/TicketView.vue"),
    beforeEnter: (to, from, next) => {
      if (
        store.getters["booking/getSelectedMatch"] &&
        store.getters["booking/getSelectedStadiumMap"] &&
        store.getters["booking/getSelectedSeat"] &&
        store.getters["booking/getTicket"]
      ) {
        return next();
      }
      next("/");
    },
  },
  {
    path: "*",
    name: "notfound",
    component: () =>
      import(/* webpackChunkName: "notfound" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const token = cookies.get("mobileNumber");
  if (!token && to.name != "login") {
    return next("/login");
  } else {
    return next();
  }
});

export default router;
