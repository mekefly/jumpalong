import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
      component: () => import("../views/LayoutView.vue"),
      children: [
        {
          path: "/home",
          component: () => import("../views/HomeView.vue"),
        },
        {
          path: "/relays",
          component: () => import("../views/RelaysView.vue"),
        },
        {
          path: "/channels",
          component: () => import("../views/ChannelsView.vue"),
        },
        {
          path: "/channel/message/:id",
          component: () => import("../views/ChannelMessageView.vue"),
        },
        {
          path: "/profile/:hash",
          component: () => import("../views/ProfileView.vue"),
        },
        {
          path: "/profile",
          component: () => import("../views/ProfileView.vue"),
        },
      ],
    },
  ],
});

export default router;
