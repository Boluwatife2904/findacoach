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
import { ref, reactive, computed } from 'vue';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import RequestItem from '../../components/requests/RequestItem.vue';
export default {
  components: { RequestItem },
  name: 'Requests',
  setup() {
    const store = useStore();
    const router = useRouter();
    // Data
    const isLoading = ref(false);
    const error = reactive({
        value: false,
        message: '',
      },)
    // Computed
    const requests = computed(() => {
      return store.getters["requests/requests"]
    })
    // Methods
    const loadRequests = async () => {
      isLoading.value = true;
      try {
        await store.dispatch('requests/fetchRequests');
        isLoading.value = false;
      } catch (err) {
        error.value = true;
        error.message = err.message || 'Error fetching requests.';
        isLoading.value = false;
      }
    }
    loadRequests();
    const handleError = () => {
      if(error.message.includes("expired")) {
        store.dispatch("logout");
        router.replace("/coaches")
      }
      error.value = false;
    }
    return { isLoading, error,  requests, handleError }
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