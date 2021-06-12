<template>
  <section>
    <base-card>
      <h1>Registeration Page</h1>
      <registeration-form @save-data="saveData"></registeration-form>
    </base-card>
    <base-dialog
      :show="isLoading"
      title="We are creating your account..."
      fixed
    >
      <base-spinner></base-spinner>
    </base-dialog>
    <base-dialog :show="!!error" title="An error occurred..." @close="closeDialog">
      <p>{{ error }}</p>
    </base-dialog>
  </section>
</template>

<script>
import RegisterationForm from "../../components/coaches/RegisterationForm.vue";
export default {
  components: { RegisterationForm },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async saveData(data) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coaches/registerCoach", data);
        this.$router.replace("/coaches");
        this.isLoading = false;
      } catch (error) {
        this.error =
          error.message ||
          "An error occurred when trying to create your account. Please try again later. Thanks.";
        this.isLoading = false;
      }
    },
    closeDialog() {
      this.error = null;
    }
  },
};
</script>

<style>
</style>