<template>
  <div class="wrapper">
    <section>
      <base-card>
        <header>
          <h2>Requests Page</h2>
        </header>
        <main>
          <base-spinner v-if="isLoading"></base-spinner>
          <ul v-else-if="!isLoading && requests && requests.length > 0">
            <request-item
              v-for="request in requests"
              :key="request.id"
              :email="request.email"
              :message="request.message"
            ></request-item>
          </ul>
          <h3 v-else>You haven't received any requests yet.</h3>
        </main>
      </base-card>
    </section>
    <base-dialog
      :show="error.value"
      title="An Error Occurred!"
      @close="handleError"
    >
      <p>{{ error.message }}</p>
    </base-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import RequestItem from '../../components/requests/RequestItem.vue';
export default {
  components: { RequestItem },
  name: 'Requests',
  computed: {
    ...mapGetters({
      requests: 'requests/requests',
    }),
  },
  data() {
    return {
      isLoading: false,
      error: {
        value: false,
        message: '',
      },
    };
  },
  async created() {
    this.loadRequests();
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/fetchRequests');
        this.isLoading = false;
      } catch (error) {
        this.error.value = true;
        this.error.message = error.message || 'Error fetching requests.';
        this.isLoading = false;
      }
    },
    handleError() {
      if(this.error.message.includes("expired")) {
        this.$store.dispatch("logout");
        this.$router.replace("/coaches")
      }
      this.error.value = false;
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>