<template>
  <section>
    <label :for="name" :class="{ mandatory: mandatory }">{{ label }}</label>
    <textarea
      :name="name"
      :placeholder="placeholder"
      v-if="multiline"
      @input="input"
    ></textarea>
    <input :name="name" :placeholder="placeholder" v-else @input="input" />
  </section>
</template>

<script>
export default {
  props: {
    label: String,
    placeholder: String,
    name: String,
    mandatory: Boolean,
    multiline: Boolean,
  },
  emits: ['input'],
  methods: {
    input(event) {
      this.$emit('input', event);
    },
  },
};
</script>

<style scoped>
section {
  padding: 0.5em 0;
}

label {
  display: block;
  padding-top: 0.5em;
  padding-bottom: 0.5em;

  font-size: 0.85em;
}

input,
textarea {
  width: 100%;
  height: calc(100% - 2em);
  padding: 1em;

  border: none;
  border-radius: 0.3em;

  box-shadow: rgba(149, 157, 165, 0.3) 0px 2px 6px;

  font-family: inherit;

  resize: none;
}

input::placeholder,
textarea::placeholder {
  color: #aaa;
}

.mandatory::after {
  position: relative;
  bottom: 2em;
  font-size: 0.3em;

  content: '⬤';

  color: #f77;
}
</style>
