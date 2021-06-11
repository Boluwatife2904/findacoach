<template>
  <button :class="mode" v-if="!link">
    <slot></slot>
  </button>
  <router-link :to="to" :class="mode" v-else>
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    mode: {
      type: String,
      required: false,
      default: '',
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      required: false,
    },
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #270041;
  border-color: #270041;
}

.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
}

@media screen and (max-width: 500px) {
  button,
  a {
    padding: 0.5rem 1.2rem;
    font-size: 15px;
  }
}
</style>