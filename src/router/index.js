import { createWebHistory, createRouter } from "vue-router";
// COACH PAGES
import CoachList from "../pages/coaches/CoachList.vue";
import SingleCoach from "../pages/coaches/SingleCoach.vue";
import ContactCoach from "../pages/coaches/ContactCoach.vue";
import Register from "../pages/coaches/Register.vue";

// REQUESTS PAGES
import Requests from "../pages/requests/Requests.vue";

// AUTH PAGES
import Login from "../pages/authentication/Login.vue";
import Signup from "../pages/authentication/Signup.vue";

// ERROR 404 IMPORTS
import Error404 from "../pages/error/Error404.vue";

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
    component: SingleCoach,
    children: [
      {
        name: "ContactCoach",
        path: "contact",
        component: ContactCoach
      }
    ],
    props: true
  },
  {
    name: "Register",
    path: "/register-as-coach",
    component: Register,
    meta: {
      requiresAuthentication: true
    }
  },
  {
    name: "Requests",
    path: "/requests",
    component: Requests,
    meta: {
      requiresAuthentication: true
    }
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
    meta: {
      noAuthentication: true
    }
  },
  {
    name: "Signup",
    path: "/signup",
    component: Signup,
    meta: {
      noAuthentication: true
    }
  },
  {
    name: "ErrorPage",
    path: "/:notFound(.*)",
    component: Error404
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
