<template>
  <section>
    <label :for="name" :class="{ mandatory: mandatory }">{{ label }}</label>
    <textarea
      :name="name"
      :placeholder="placeholder"
      @input="input"
      v-model="rule.value"
      :class="{ invalid: !rule.isValid && rule.reason }"
      v-if="multiline"
    ></textarea>
    <input
      :name="name"
      :placeholder="placeholder"
      @input="input"
      v-model="rule.value"
      :class="{ invalid: !rule.isValid && rule.reason }"
      v-else
    />
    <label :for="name" :class="{ reason: true, error: rule.reason }">{{
      rule.reason || 'placeholder'
    }}</label>
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
    rule: Object,
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
label {
  display: block;

  padding-bottom: 4px;

  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 13px;

  letter-spacing: -0.02em;

  color: #49485e;
}

input,
textarea {
  width: 100%;
  height: calc(100% - 2em);
  padding: 9px;

  border: 1px solid transparent;
  border-radius: 0.3em;

  box-shadow: rgba(149, 157, 165, 0.3) 0px 2px 6px;

  font-family: inherit;

  resize: none;
}

input::placeholder,
textarea::placeholder {
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;

  color: #b4b4b4;
}

.mandatory::after {
  position: relative;
  bottom: 2em;
  font-size: 0.3em;

  content: '⬤';

  width: 4px;
  height: 4px;

  color: var(--attention-color);
  border-radius: 4px;
}

.invalid {
  border: solid;
  border: 1px solid #ff8484;
}

.invalid:focus {
  border: 1px solid var(--attention-color);
  outline: var(--attention-color);
}

.reason {
  padding-top: 4px;

  visibility: hidden;

  font-style: normal;
  font-weight: 400;
  font-size: 8px;
  line-height: 10px;

  letter-spacing: -0.02em;

  color: var(--attention-color);
}

.error {
  visibility: visible;

  color: var(--attention-color);
}
</style>
