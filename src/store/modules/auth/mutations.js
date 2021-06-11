export default {
  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.tokenExpiration = payload.tokenExpiration;
  },
  setLoginState(state, payload) {
    state.isLoggedIn = payload;
  }
};