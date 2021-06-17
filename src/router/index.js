import { createWebHistory, createRouter } from "vue-router";
// COACH PAGES
import CoachList from "../pages/coaches/CoachList.vue";

// VUEX Import
import store from "../store/index";

const routes = [
  {
    name: "Index",
    path: "/",
    redirect: "/coaches"
  },
  {
    name: "CoachesList",
    path: "/coaches",
    component: CoachList
  },
  {
    name: "CoachDetails",
    path: "/coaches/:id",
    component: () => import("../pages/coaches/SingleCoach.vue"),
    children: [
      {
        name: "ContactCoach",
        path: "contact",
        component: () => import("../pages/coaches/ContactCoach.vue"),
      }
    ],
    props: true
  },
  {
    name: "Register",
    path: "/register-as-coach",
    component: () => import("../pages/coaches/Register.vue"),
    meta: {
      requiresAuthentication: true
    }
  },
  {
    name: "Requests",
    path: "/requests",
    component: () => import("../pages/requests/Requests.vue"),
    meta: {
      requiresAuthentication: true
    }
  },
  {
    name: "Login",
    path: "/login",
    component: () => import("../pages/authentication/Login.vue"),
    meta: {
      noAuthentication: true
    }
  },
  {
    name: "Signup",
    path: "/signup",
    component: () => import("../pages/authentication/Signup.vue"),
    meta: {
      noAuthentication: true
    }
  },
  {
    name: "ErrorPage",
    path: "/:notFound(.*)",
    component: () => import("../pages/error/Error404.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_, _2, savedPosition) {
    return savedPosition ? savedPosition : { top: 0, left: 0 };
  }
});

router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuthentication && !store.getters.isAuthenticated) {
    console.log("Requires Authentication");
    next("/login");
  } else if (to.meta.noAuthentication && store.getters.isAuthenticated) {
    next("/coaches");
  } else {
    next();
  }
});

export default router;
