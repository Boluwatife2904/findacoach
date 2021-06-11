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
export default {
  props: ['id'],
  computed: {
    toContactLink() {
      return {
        name: 'ContactCoach',
        params: {
          id: this.id,
        },
      };
    },
    fullName() {
      return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    description() {
      return this.selectedCoach.description;
    },
  },
  data() {
    return {
      selectedCoach: null,
    };
  },
  created() {
    const allCoaches = this.$store.getters['coaches/coaches'];
    this.selectedCoach = allCoaches.find((coach) => coach.id === this.id);
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