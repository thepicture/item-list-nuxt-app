<template>
  <button :type="type"><slot></slot></button>
</template>

<script>
export default {
  props: {
    content: String,
    type: String,
  },
};
</script>

<style scoped>
button {
  border: none;

  color: gray;

  font-size: 1.1em;

  border-radius: 0.7em;

  padding: 0.8em;

  width: 100%;

  box-sizing: border-box;
}
</style>
