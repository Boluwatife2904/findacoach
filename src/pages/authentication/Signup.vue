<template>
  <div class="auth-wrapper">
    <base-dialog fixed :show="isLoading" title="Authenticating...">
      <base-spinner></base-spinner>
    </base-dialog>
    <base-dialog
      :show="!!error"
      title="An Error Occurred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <base-card>
      <h2>Signup</h2>
      <form @submit.prevent="submitForm">
        <div class="form-control" :class="{ invalid: email.invalid }">
          <label for="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            v-model.trim="email.value"
            @focus="resetValidity(email)"
          />
          <p v-if="email.invalid">{{ email.errorMessage }}</p>
        </div>
        <div class="form-control" :class="{ invalid: password.invalid }">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            v-model.trim="password.value"
            @focus="resetValidity(password)"
          />
          <p v-if="password.invalid">{{ password.errorMessage }}</p>
        </div>
        <base-button>Signup</base-button>
      </form>
      <div class="login-instead">
        <p>
          Already have an account? <router-link to="/login">Login</router-link>
        </p>
      </div>
    </base-card>
  </div>
</template>

<script>
import authentication from "../../composables/authentication";
export default {
  name: "Signup",
  setup() {
    const {
      email,
      password,
      error,
      isLoading,
      submitForm,
      resetValidity,
      handleError,
    } = authentication("signup");

    return {
      email,
      password,
      error,
      isLoading,
      submitForm,
      resetValidity,
      handleError,
    };
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 30px;
}

form {
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0 1.5rem;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
  padding: 15px 10px;
  border-radius: 6px;
  transition: all 0.2s linear;
  outline: none;
}

input:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

.invalid label {
  color: red;
}

.invalid input {
  border: 1px solid red;
}

.invalid p {
  margin-top: 8px;
  font-size: 14px;
  color: crimson;
}

.login-instead {
  margin-top: 30px;
  text-align: center;
  margin-bottom: 10px;
}

.login-instead a {
  text-decoration: none;
  color: #3d008d;
  outline: none;
}
</style>