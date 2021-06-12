import { createStore } from "vuex";
import CoachesModule from "./modules/coaches/index.js";
import RequestsModule from "./modules/requests/index";
import AuthModule from "./modules/auth/index.js";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  modules: {
    coaches: CoachesModule,
    requests: RequestsModule,
    auth: AuthModule,
  },
  plugins: [createPersistedState()],
});

export default store;