import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/challenge/:id",
      name: "Challenge",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/ChallengeView.vue"),
      props: (route) => {
        const id = Number.parseInt(route.params.id, 10);
        if (Number.isNaN(id)) {
          return 0;
        }
        return { id };
      },
    },
    {
      path: "/vote",
      name: "Vote",
      // route level code-splitting
      // this generates a separate chunk (dashboard.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/VoteView.vue"),
    },
    {
      path: "/vote/:id",
      name: "Vote challenge",
      // route level code-splitting
      // this generates a separate chunk (dashboard.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/VoteChallengeView.vue"),
      props: (route) => {
        const id = Number.parseInt(route.params.id, 10);
        if (Number.isNaN(id)) {
          return 0;
        }
        return { id };
      },
    },
  ],
});

export default router;
