<template>
  <button :type="type" :class="{ enabled }" :disabled="!enabled">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    content: String,
    type: String,
    enabled: Boolean,
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

button {
  width: 100%;

  padding: 11px;

  border: none;

  background: var(--button-disabled-background-color);
  border-radius: 10px;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;

  text-align: center;
  letter-spacing: -0.02em;
}

.enabled {
  border-radius: 10px;

  background: var(--button-primary-background-color);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  color: white;
  cursor: pointer;
}
</style>
