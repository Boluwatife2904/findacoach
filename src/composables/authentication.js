import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const authentication = (mode) => {
  const store = useStore();
  const router = useRouter();
  // Data
  const email = reactive({
    value: "",
    invalid: false,
    errorMessage: ""
  });
  const password = reactive({
    value: "",
    invalid: false,
    errorMessage: ""
  });
  const formIsInvalid = ref(false);
  const isLoading = ref(false);
  const error = ref(null);

  // Methods
  const validateForm = () => {
    formIsInvalid.value = false;
    if (email.value === "") {
      formIsInvalid.value = true;
      email.invalid = true;
      email.errorMessage = "Enter your registered email address";
    } else if (!email.value.includes("@")) {
      formIsInvalid.value = true;
      email.invalid = true;
      email.errorMessage = "Please enter a valid email address";
    }
    if (password.value === "") {
      formIsInvalid.value = true;
      password.invalid = true;
      password.errorMessage = "Enter your password to continue";
    } else if (password.value.length < 6) {
      formIsInvalid.value = true;
      password.invalid = true;
      password.errorMessage =
        "Your password must contain at least 6 characters.";
    }
  };

  const submitForm = async () => {
    validateForm();
    if (formIsInvalid.value) {
      return;
    }
    const userInfo = {
      email: email.value,
      password: password.value
    };
    isLoading.value = true;
    try {
      await store.dispatch(mode, userInfo);
      isLoading.value = false;
      router.replace("/coaches");
    } catch (err) {
      error.value = err;
      isLoading.value = false;
    }
  };

  const resetValidity = input => {
    input.invalid = false;
  };

  const handleError = () => {
    error.value = null;
  };

  return { email, password, formIsInvalid, isLoading, error, handleError, resetValidity, submitForm, }
};

export default authentication;
