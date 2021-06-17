<template>
  <div class="wrapper">
    <base-dialog
      :show="!!errorMessage"
      title="An Error occurred"
      @close="handleError"
    >
      <p>{{ errorMessage }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button
            link
            to="/register-as-coach"
            v-if="isAuthenticated && !isCoach && !isLoading"
            >Register as a Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches && filteredCoaches.length !== 0">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          ></coach-item>
        </ul>
        <h3 v-else class="no-coach">No Coaches Found</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";
import CoachItem from "../../components/coaches/CoachItem.vue";
import { useStore } from "vuex";
export default {
  components: { CoachItem, CoachFilter },
  setup() {
    const store = useStore();
    // Data
    const isLoading = ref(false);
    const errorMessage = ref(null);
    const activeFilters = ref({
      frontend: true,
      backend: true,
      career: true,
    });

    // Computed
    const isAuthenticated = computed(() => store.getters.isAuthenticated);

    const hasCoaches = computed(
      () => !isLoading.value && store.getters["coaches/hasCoaches"]
    );

    const isCoach = computed(() => store.getters["coaches/isCoach"]);

    const filteredCoaches = computed(() => {
      const coaches = store.getters["coaches/coaches"];
      return coaches.filter((coach) => {
        if (activeFilters.value.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (activeFilters.value.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (activeFilters.value.career && coach.areas.includes("career")) {
          return true;
        }
      });
    });

    // Methods
    const setFilters = (updatedFilters) => {
      activeFilters.value = updatedFilters;
    };

    const loadCoaches = async (refresh = false) => {
      isLoading.value = true;
      try {
        await store.dispatch("coaches/loadCoaches", {
          forceRefresh: refresh,
        });
        isLoading.value = false;
      } catch (error) {
        isLoading.value = false;
        errorMessage.value = error.message || "Something went wrong";
      }
    };
    loadCoaches();

    const handleError = () => {
      errorMessage.value = null;
    };

    return {
      isLoading,
      errorMessage,
      activeFilters,
      setFilters,
      handleError,
      isAuthenticated,
      hasCoaches,
      isCoach,
      filteredCoaches,
      loadCoaches
    };
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}

.no-coach {
  margin: 40px 0;
  text-align: center;
}
</style>