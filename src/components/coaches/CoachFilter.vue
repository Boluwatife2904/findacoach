<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <form>
      <span class="filter-option">
        <input type="checkbox" value="frontend" id="frontend" @change="setFilter" checked>
        <label for="frontend">Frontend</label>
      </span>
      <span class="filter-option">
        <input type="checkbox" value="backend" id="backend" @change="setFilter" checked>
        <label for="backend">Backend</label>
      </span>
      <span class="filter-option">
        <input type="checkbox" value="career" id="career" @change="setFilter" checked>
        <label for="career">Career</label>
      </span>
    </form>
  </base-card>
</template>

<script>
export default {
  name: 'filterCoaches',
  emits: ["change-filter"],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      }
    }
  },
  methods: {
    filterCoaches() {
      console.log('Coaches have been filtered');
    },
    setFilter(event) {
      const inputId = event.target.id;
      const isActive = event.target.checked;
      const updatedFilters = {
        ...this.filters,
        [inputId]: isActive
      }
      this.filters = updatedFilters;
      this.$emit("change-filter", updatedFilters)
    }
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