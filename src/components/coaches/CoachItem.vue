<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <base-badge
        v-for="area in areas"
        :key="area"
        :text="area"
        :type="area"
      ></base-badge>
    </div>
    <div class="actions">
      <base-button link mode="outline" :to="contactCoachLink"
        >Contact</base-button
      >
      <base-button link :to="viewCoachLink">View Details</base-button>
    </div>
  </li>
</template>

<script>
import { computed } from "vue";
import BaseBadge from "../ui/BaseBadge.vue";
export default {
  components: { BaseBadge },
  name: "CoachItem",
  props: ["id", "firstName", "lastName", "rate", "areas"],
  setup(props) {
    const fullName = computed(() => `${props.firstName} ${props.lastName}`);
    const contactCoachLink = computed(() => {
      return {
        name: "CoachDetails",
        params: {
          id: props.id,
        },
      };
    });
    const viewCoachLink = computed(() => {
      return {
        name: "CoachDetails",
        params: {
          id: props.id,
        },
      };
    });
    return { fullName, contactCoachLink, viewCoachLink };
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>