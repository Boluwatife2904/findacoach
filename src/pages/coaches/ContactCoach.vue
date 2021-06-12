<template>
  <div class="wrapper">
    <form @submit.prevent="contactCoach">
      <div class="form-control" :class="{ invalid: email.invalid }">
        <label for="email">Email Address</label>
        <input
          type="email"
          name="email"
          id="email"
          v-model.trim="email.value"
          @focus="resetValidity('email')"
        />
        <p v-if="email.invalid">You need to provide a message to the Coach</p>
      </div>
      <div class="form-control" :class="{ invalid: message.invalid }">
        <label for="message">Message</label>
        <textarea
          name="message"
          id="message"
          v-model.trim="message.value"
          cols="30"
          rows="7"
          @focus="resetValidity('message')"
        ></textarea>
        <p v-if="message.invalid">You need to provide a message to the Coach</p>
      </div>
      <div class="actions">
        <base-button>Send Request</base-button>
      </div>
    </form>
    <base-dialog :show="isLoading" title="Sending request to Coach..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-dialog
      :show="requestSent"
      title="Request Sent..."
      @close="requestSent = false"
    >
      <p>
        Your request has been sent to the coach. Kindly wait for a response from
        the coach on what to do next. Thanks.
      </p>
    </base-dialog>
  </div>
</template>

<script>
export default {
  name: "ContactCoach",
  data() {
    return {
      email: {
        value: "",
        invalid: false,
      },
      message: {
        value: "",
        invalid: false,
      },
      formIsInvalid: false,
      isLoading: false,
      requestSent: false,
    };
  },
  methods: {
    validateForm() {
      this.formIsInvalid = false;
      if (this.email.value === "") {
        this.email.invalid = true;
        this.formIsInvalid = true;
      }
      if (this.message.value === "") {
        this.message.invalid = true;
        this.formIsInvalid = true;
      }
    },
    resetValidity(input) {
      this[input].invalid = false;
    },
    async contactCoach() {
      this.validateForm();
      if (this.formIsInvalid) {
        return;
      }
      const formData = {
        coachId: this.$route.params.id,
        email: this.email.value,
        message: this.message.value,
      };
      this.isLoading = true;
      try {
        await this.$store.dispatch("requests/contactCoach", formData);
        this.isLoading = false;
        this.requestSent = true;
        this.email.value = "";
        this.message.value = "";
      } catch (error) {
        console.log(error);
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem 0;
  /* border: 1px solid #ccc; */
  /* border-radius: 12px; */
  /* padding: 1rem; */
}

.form-control {
  margin: 0.5rem 0 1rem;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 15px 10px;
  border-radius: 6px;
  transition: all 0.2s linear;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.actions {
  text-align: center;
}

.form-control.invalid input,
.form-control.invalid textarea {
  border: 1px solid crimson;
}

.form-control.invalid label {
  color: crimson;
}

.form-control.invalid p {
  margin-top: 8px;
  color: crimson;
  font-size: 15px;
}
</style>