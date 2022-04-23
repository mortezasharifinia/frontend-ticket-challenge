import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

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
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
