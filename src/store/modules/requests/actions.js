export default {
  async contactCoach(context, payload) {
    const newRequest = {
      email: payload.email,
      message: payload.message
    };
    const response = await fetch(
      `https://newfindacoach-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(newRequest)
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || "Error sending request.");
      throw error;
    }
    context.commit("addRequest", {
      ...newRequest,
      id: responseData.name,
      coachId: payload.coachId
    });
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://newfindacoach-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.error || "Failed to load requests.");
      throw error;
    }
    const requests = [];
    for (const key in responseData) {
      const request = {
        id: key,
        coachId,
        email: responseData[key].email,
        message: responseData[key].message
      };
      requests.push(request);
    }
    context.commit("setRequests", requests);
  }
};
