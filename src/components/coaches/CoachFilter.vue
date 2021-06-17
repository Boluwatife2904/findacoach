<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <form>
      <span class="filter-option">
        <input
          type="checkbox"
          value="frontend"
          id="frontend"
          @change="setFilter"
          checked
        />
        <label for="frontend">Frontend</label>
      </span>
      <span class="filter-option">
        <input
          type="checkbox"
          value="backend"
          id="backend"
          @change="setFilter"
          checked
        />
        <label for="backend">Backend</label>
      </span>
      <span class="filter-option">
        <input
          type="checkbox"
          value="career"
          id="career"
          @change="setFilter"
          checked
        />
        <label for="career">Career</label>
      </span>
    </form>
  </base-card>
</template>

<script>
import { ref } from "vue";
export default {
  name: "filterCoaches",
  emits: ["change-filter"],
  setup(_, context) {
    // Data
    const filters = ref({
      frontend: true,
      backend: true,
      career: true,
    });
    // Methods
    const setFilter = (event) => {
      const inputId = event.target.id;
      const isActive = event.target.checked;
      const updatedFilters = {
        ...filters.value,
        [inputId]: isActive,
      };
      filters.value = updatedFilters;
      context.emit("change-filter", updatedFilters);
    }
    return { setFilter }
  },
};
</script>

<style>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
  cursor: pointer;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>