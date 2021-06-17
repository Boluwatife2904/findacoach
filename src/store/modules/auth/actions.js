export default {
  async signup(context, payload) {
    return context.dispatch("auth", {...payload, mode: "signup"})
  },
  async login(context, payload) {
    return context.dispatch("auth", {...payload, mode: "login"})
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbnbAIShcRaA8ZHG91yK7yaFxsGVZxSL0`;
    if (mode === "signup") {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbnbAIShcRaA8ZHG91yK7yaFxsGVZxSL0`;
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });
    const responseData = await response.json();
    // Error handling goes in here
    if (!response.ok) {
      let message = "An error occurred trying to log you in.";
      if (mode === "signup") {
        message = "An error occured trying to sign you up"
      }
      const error = new Error(
        responseData.error.message || message
      );
      throw error;
    }
    const { idToken, localId, expiresIn } = responseData;
    context.commit("setUser", {
      token: idToken,
      userId: localId,
      tokenExpiration: expiresIn
    });
    context.commit("setAuthState", true);
  },
  logout(context) {
    context.commit("setUser", {
      token: null,
      userId: null,
      tokenExpiration: null
    });
    context.commit("setAuthState", false);
  }
};
