<template>
  <section>
    <base-card>
      <h1>Registeration Page</h1>
      <registeration-form @save-data="saveData"></registeration-form>
    </base-card>
  </section>
</template>

<script>
import RegisterationForm from '../../components/coaches/RegisterationForm.vue';
export default {
  components: { RegisterationForm },
  methods: {
    async saveData(data) {
      await this.$store.dispatch("coaches/registerCoach", data);
      this.$router.replace("/coaches")
    }
  }
  };
</script>

<style>
</style>