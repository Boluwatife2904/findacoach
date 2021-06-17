<template>
  <div class="wrapper">
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/per hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :text="area"
        ></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h3>Interested? Reach out now</h3>
          <base-button
            link
            :to="toContactLink"
            v-if="$route.name !== 'ContactCoach'"
            >Contact</base-button
          >
        </header>
        <router-view></router-view>
      </base-card>
    </section>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
  props: ["id"],
  setup(props) {
    const store = useStore();
    // Data
    const selectedCoach = ref(null);
    // Select Coach with matching id from the store
    const allCoaches = store.getters["coaches/coaches"];
    selectedCoach.value = allCoaches.find((coach) => coach.id === props.id);
    // Computed properties
    const toContactLink = computed(() => {
      return {
        name: "ContactCoach",
        params: {
          id: props.id,
        },
      };
    });
    const fullName = computed(() => `${selectedCoach.value.firstName} ${selectedCoach.value.lastName}`);
    const rate = computed(() => selectedCoach.value.hourlyRate);
    const areas = computed(() => selectedCoach.value.areas);
    const description = computed(() => selectedCoach.value.description);
    return { toContactLink, fullName, rate, areas, description };
  },
};
</script>

<style scoped>
p {
  margin-top: 30px;
  line-height: 26px;
}

header h3 {
  margin-bottom: 20px;
}
</style>