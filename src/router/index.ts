import { createRouter, createWebHashHistory } from "vue-router";
import { PRIVATE_KEY } from "../api/login";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
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
          path: "/channel/message/:eventId",
          name: "channel-message",
          component: () => import("../views/ChannelMessageView.vue"),
        },
        {
          path: "/profile/:value",
          name: "profile",
          component: () => import("../views/ProfileView.vue"),
        },
        {
          path: "/profile",
          component: () => import("../views/ProfileView.vue"),
        },
        {
          path: "/task",
          component: () => import("../views/TaskView.vue"),
        },
        {
          path: "/settings",
          component: () => import("../views/SettingsView.vue"),
        },
        {
          path: "/about",
          component: () => import("../views/AboutView.vue"),
        },
        {
          path: "/content/blacklist",
          name: "content-blacklist-view",
          component: () => import("../views/ContentBlacklistView.vue"),
        },
        {
          path: "/relay/info/:url",
          name: "relay-info-view",
          component: () => import("../views/RelayInfoView.vue"),
        },
        {
          path: "/short/text/note/:value",
          name: "short-text-note",
          component: () => import("../views/ShortTextNoteView.vue"),
        },
        {
          path: "/search/:value?",
          name: "search",
          component: () => import("../views/SearchView.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const prikey = window.localStorage.getItem(PRIVATE_KEY);
  if (to.name === "login") {
    next();
  } else if (!prikey) {
    next({ name: "login", query: { redirected: to.fullPath } });
  } else {
    next();
  }
});

export default router;
