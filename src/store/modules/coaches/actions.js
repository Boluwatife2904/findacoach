export default {
  async registerCoach(context, payload) {
    const userId = context.rootGetters.userId;
    const coach = {
      firstName: payload.first,
      lastName: payload.last,
      description: payload.desc,
      hourlyRate: payload.rate,
      areas: payload.areas
    };

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://newfindacoach-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(coach)
      }
    );

    const responseData = await response.json();
    console.log(responseData);

    if (!response.ok) {
      // error handling
    }

    context.commit('registerCoach', {
      ...coach,
      id: userId
    });
  },
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    const response = await fetch(
      `https://newfindacoach-default-rtdb.firebaseio.com/coaches.json`
    );
    const responseData = await response.json();
    if (!response.ok) {
      // Error Handling goes in here
      const error = new Error('Error fetching coaches');
      throw error;
    }
    const coaches = [];
    for (const data in responseData) {
      const newCoach = {
        id: data,
        areas: responseData[data].areas,
        hourlyRate: responseData[data].hourlyRate,
        firstName: responseData[data].firstName,
        lastName: responseData[data].lastName,
        description: responseData[data].description
      };
      coaches.push(newCoach);
    }
    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  }
};
