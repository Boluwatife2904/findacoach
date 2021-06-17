<template>
  <form @submit.prevent="registerAsCoach">
    <div class="form-control" :class="{ invalid: !firstName.valid }">
      <label for="firstName">First Name</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        v-model.trim="firstName.value"
        @focus="resetValidity(firstName)"
      />
      <p v-if="!firstName.valid">First name cannot be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.valid }">
      <label for="lastName">Last Name</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        v-model.trim="lastName.value"
        @focus="resetValidity(lastName)"
      />
      <p v-if="!lastName.valid">Last name cannot be empty</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.valid }">
      <label for="description">Description</label>
      <textarea
        name="description"
        id="description"
        v-model.trim="description.value"
        cols="30"
        rows="5"
        @focus="resetValidity(description)"
      ></textarea>
      <p v-if="!description.valid">
        You need to provide a description of yourself.
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !hourlyRate.valid }">
      <label for="hourlyRate">Rate</label>
      <input
        type="number"
        name="hourlyRate"
        id="hourlyRate"
        v-model.number="hourlyRate.value"
        @focus="resetValidity(hourlyRate)"
      />
      <p v-if="!hourlyRate.valid">
        You need to provide a hourly rate that cannot be negative
      </p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.valid }">
      <h6>Areas of Expertise</h6>
      <div class="area-of-expertise">
        <input
          type="checkbox"
          name="areas"
          id="frontend"
          value="frontend"
          v-model="areas.value"
          @focus="resetValidity(areas)"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div class="area-of-expertise">
        <input
          type="checkbox"
          name="areas"
          id="backend"
          value="backend"
          v-model="areas.value"
          @focus="resetValidity(areas)"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div class="area-of-expertise">
        <input
          type="checkbox"
          name="areas"
          id="career"
          value="career"
          v-model="areas.value"
          @focus="resetValidity(areas)"
        />
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="!areas.valid">
        You need to select at least one area of expertise.
      </p>
    </div>
    <base-button>Register</base-button>
  </form>
</template>

<script>
import { reactive, ref } from "vue";
export default {
  name: "RegistrationForm",
  emits: ["save-data"],
  setup(_, context) {
    // Data
    const firstName = reactive({
      value: "",
      valid: true,
    });
    const lastName = reactive({
      value: "",
      valid: true,
    });
    const description = reactive({
      value: "",
      valid: true,
    });
    const hourlyRate = reactive({
      value: null,
      valid: true,
    });
    const areas = reactive({
      value: [],
      valid: true,
    });
    const formIsValid = ref(true);

    // Methods
    const validateForm = () => {
      formIsValid.value = true;
      if (firstName.value === "") {
        firstName.valid = false;
        formIsValid.value = false;
      }
      if (lastName.value === "") {
        lastName.valid = false;
        formIsValid.value = false;
      }
      if (description.value === "") {
        description.valid = false;
        formIsValid.value = false;
      }
      if (!hourlyRate.value || hourlyRate.value <= 0) {
        hourlyRate.valid = false;
        formIsValid.value = false;
      }
      if (!areas.value || areas.value.length <= 0) {
        areas.valid = false;
        formIsValid.value = false;
      }
    };

    const resetValidity = (input) => {
      input.valid = true;
    };

    const registerAsCoach = () => {
      validateForm();

      if (!formIsValid.value) {
        return;
      }

      const formData = {
        first: firstName.value,
        last: lastName.value,
        desc: description.value,
        rate: hourlyRate.value,
        areas: areas.value,
      };
      context.emit("save-data", formData);
    };

    return {
      firstName,
      lastName,
      description,
      hourlyRate,
      areas,
      resetValidity,
      registerAsCoach
    };
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0 1.5rem;
}

.form-control h6 {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.area-of-expertise {
  margin-bottom: 0.5rem;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label,
input[type="checkbox"] {
  cursor: pointer;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
  padding: 15px 10px;
  border-radius: 6px;
  transition: all 0.2s linear;
  outline: none;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: crimson;
}

.invalid input,
.invalid textarea {
  border: 1px solid crimson;
}

.invalid p {
  margin-top: 8px;
  font-size: 14px;
  color: crimson;
}
</style>