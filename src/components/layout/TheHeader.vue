<template>
  <header>
    <nav>
      <h1><router-link to="/">FindACoach</router-link></h1>
      <ul>
        <li>
          <router-link to="/coaches">Coaches</router-link>
        </li>
        <li v-if="isAuthenticated">
          <router-link to="/requests">Requests</router-link>
        </li>
        <li v-else>
          <router-link to="/login">Login</router-link>
        </li>
        <li v-if="isAuthenticated">
          <base-button @click="logout">Logout</base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "TheHeader",
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.replace("/login");
    }
  }
};
</script>

<style scoped>
header {
  width: 100%;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  position: sticky;
  top: 0;
  left: 0;
  padding: 1.5rem 0;
}

header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}

@media screen and (max-width: 500px) {
  header {
    padding-top: 0.5rem;
  }

  header nav {
    flex-direction: column;
  }
}
</style>