import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      redirect: "/login/language",
      component: () => import("../views/LoginStepsView.vue"),
      children: [
        {
          path: "/login/language",
          name: "language",
          alias: "/login-step-1",
          meta: {
            step: 1,
          },
          component: () => import("../views/LoginLanguageView.vue"),
        },
        {
          path: "/logon",
          name: "login-form",
          alias: "/login-step-2",
          meta: {
            step: 2,
          },
          component: () => import("../views/logonView.vue"),
        },
        {
          path: "/relay/configuration",
          name: "relay-configuration",
          alias: "/login-step-3",
          meta: {
            step: 3,
          },
          component: () => import("../views/LoginRelaysView.vue"),
        },
        {
          path: "/login/complete",
          name: "login-complete",
          alias: "/login-step-4",
          meta: {
            step: 4,
          },
          component: () => import("../views/LoginCompleteView.vue"),
        },
      ],
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
          path: "/channel/message/:value",
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
          name: "relay-info",
          component: () => import("../views/RelayInfoView.vue"),
        },
        {
          path: "/to-back",
          name: "to-back",
          component: () => import("../views/ToBackView.vue"),
          children: [
            {
              path: "/search/:value?",
              name: "search",
              component: () => import("../views/SearchView.vue"),
            },
            {
              path: "/short/text/note/:value",
              name: "short-text-note",
              component: () => import("../views/ShortTextNoteView.vue"),
            },
            {
              path: "/channel/create",
              name: "create-channel",
              component: () => import("../views/CreateChannelView.vue"),
            },
            {
              path: "/channel/edit/:value",
              name: "edit-channel",
              component: () => import("../views/EditChannelView.vue"),
            },
          ],
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const prikey = localStorage.getItem("newUserFlag");
  const currentPrikey = localStorage.getItem("prikey");
  if (
    to.path.startsWith("/login") ||
    ["relay-info", "login"].some((nextName) => to.name === nextName)
  ) {
    next();
  } else if (prikey && prikey === currentPrikey) {
    next({ name: "login", query: { redirected: to.fullPath } });
  } else {
    next();
  }
});

export default router;
