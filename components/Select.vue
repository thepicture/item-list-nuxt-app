<template>
  <select :value="value" @change="change">
    <option
      :selected="option.selected"
      :value="option.value"
      v-for="option in options"
    >
      {{ option.content }}
    </option>
  </select>
</template>

<script>
export default {
  props: ['options', 'value'],
  methods: {
    change(event) {
      this.$emit('change', event.target.value);
    },
  },
};
</script>

<style scoped>
select {
  width: 100%;
  padding: 0.8em;

  border: none;
  border-radius: 0.3em;

  box-shadow: rgba(149, 157, 165, 0.3) 0px 2px 6px;

  color: #777;
  background-color: white;
}
</style>
