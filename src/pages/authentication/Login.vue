<template>
  <div class="auth-wrapper">
    <base-dialog title="Hold on a bit..." :show="isLoading" fixed>
      <base-spinner></base-spinner>    
    </base-dialog>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-card>
      <h2>Login</h2>
      <form @submit.prevent="submitForm">
        <div class="form-control" :class="{ invalid: email.invalid }">
          <label for="email">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            v-model.trim="email.value"
            @focus="resetValidity('email')"
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
            @focus="resetValidity('password')"
          />
          <p v-if="password.invalid">{{ password.errorMessage }}</p>
        </div>
        <base-button>Login</base-button>
      </form>
      <div class="login-instead">
        <p>
          Don't have an account? <router-link to="/signup">Signup</router-link>
        </p>
      </div>
    </base-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: {
        value: "",
        invalid: false,
        errorMessage: "",
      },
      password: {
        value: "",
        invalid: false,
        errorMessage: "",
      },
      formIsInvalid: false,
      isLoading: false,
      error: null,
    };
  },
  methods: {
    validateForm() {
      this.formIsInvalid = false;
      if (this.email.value === "") {
        this.formIsInvalid = true;
        this.email.invalid = true;
        this.email.errorMessage = "Enter your registered email address";
      } else if (!this.email.value.includes("@")) {
        this.formIsInvalid = true;
        this.email.invalid = true;
        this.email.errorMessage = "Please enter a valid email address";
      }
      if (this.password.value === "") {
        this.formIsInvalid = true;
        this.password.invalid = true;
        this.password.errorMessage = "Enter your password to continue";
      } else if (this.password.value.length < 6) {
        this.formIsInvalid = true;
        this.password.invalid = true;
        this.password.errorMessage =
          "Your password must contain at least 6 characters.";
      }
    },
    async submitForm() {
      this.validateForm();
      if (this.formIsInvalid) {
        return;
      }
      const userInfo = {
        email: this.email.value,
        password: this.password.value
      }
      this.isLoading = true;
      try {
        await this.$store.dispatch("login", userInfo)
        this.isLoading = false;
      } catch (error) {
        this.error = error;
        this.isLoading = false;
      }
    },
    resetValidity(input) {
      this[input].invalid = false;
    },
    handleError() {
      this.error = null;
    }
  },
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
  border: 1px solid crimson;
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