<template>
  <section>
    <Item
      v-bind:key="item.id"
      :traits="item"
      v-for="item in items"
      @edit="edit"
      @prune="prune"
    />
  </section>
</template>

<script>
export default {
  props: ['items'],
  methods: {
    prune(id) {
      this.$emit('prune', id);
    },
    edit(id) {
      this.$emit('edit', id);
    },
  },
};
</script>

<style scoped>
section {
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 1em;
}
</style>
