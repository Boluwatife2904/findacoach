import { createWebHistory, createRouter} from 'vue-router';
// COACH PAGES
import CoachList from "../pages/coaches/CoachList.vue";
import SingleCoach from "../pages/coaches/SingleCoach.vue";
import ContactCoach from "../pages/coaches/ContactCoach.vue"
import Register from "../pages/coaches/Register.vue"

// REQUESTS PAGES
import Requests from "../pages/requests/Requests.vue"

// ERROR 404 IMPORTS
import Error404 from "../pages/error/Error404.vue"

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
    path: "/register",
    component: Register
  },
  {
    name: "Requests",
    path: "/requests",
    component: Requests
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
    return savedPosition ? savedPosition : { top : 0, left: 0 }
  }
})

export default router;