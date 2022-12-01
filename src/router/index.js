import { createRouter, createWebHistory } from "vue-router";
//import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/IndexView.vue"),
      children: [
        {
          path: "market_index",
          name: "market_home",
          component: () => import("../views/content/MarketIndexView.vue"),
        },
        {
          path: "domestic_news",
          name: "domestic_news",
          component: () => import("../views/content/DomesticNewsView.vue"),
        },
        {
          path: "international_news",
          name: "international_news",
          component: () => import("../views/content/InternationalNewsView.vue"),
        },
        {
          path: "my_choice",
          name: "my_choice",
          component: () => import("../views/content/MyChoiceView.vue"),
        },
        {
          path: "others",
          name: "others",
          component: () => import("../views/content/OthersView.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "consumer_login",
      component: () => import("../views/consumer/LoginView.vue"),
    },
  ],
});

export default router;
