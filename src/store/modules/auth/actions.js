export default {
  async signup(context, payload) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbnbAIShcRaA8ZHG91yK7yaFxsGVZxSL0`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...payload, returnSecureToken: true })
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.error.message || "An error occurred trying to sign you up."
      );
      throw error;
    }
    const { idToken, localId, expiresIn } = responseData;
    context.commit("setUser", {
      token: idToken,
      userId: localId,
      tokenExpiration: expiresIn
    });
  },
  async login(context, payload) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbnbAIShcRaA8ZHG91yK7yaFxsGVZxSL0`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...payload, returnSecureToken: true })
      }
    );
    const responseData = await response.json();
    // Error handling goes in here
    if (!response.ok) {
      const error = new Error(
        responseData.error.message || "An error occurred trying to sign you up."
      );
      throw error;
    }
    const { idToken, localId, expiresIn } = responseData;
    context.commit("setUser", {
      token: idToken,
      userId: localId,
      tokenExpiration: expiresIn
    });
  }
};
