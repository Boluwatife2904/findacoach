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
    <base-dialog
      :show="!!error"
      title="An error occurred..."
      @close="closeDialog"
    >
      <p>{{ error }}</p>
    </base-dialog>
  </section>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import RegisterationForm from "../../components/coaches/RegisterationForm.vue";
export default {
  components: { RegisterationForm },
  setup() {
    const store = useStore();
    const router = useRouter();
    // Data
    const isLoading = ref(false);
    const error = ref(null);
    // Methods
    const saveData = async (data) => {
      isLoading.value = true;
      try {
        await store.dispatch("coaches/registerCoach", data);
        router.replace("/coaches");
        isLoading.value = false;
      } catch (err) {
        error.value =
          err.message ||
          "An error occurred when trying to create your account. Please try again later. Thanks.";
        isLoading.value = false;
      }
    };
    const closeDialog = () => {
      error.value = null;
    };
    return { isLoading, error, closeDialog, saveData };
  },
};
</script>

<style>
</style>