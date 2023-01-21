<template>
  <section>
    <Item
      v-bind:key="item.id"
      :traits="item"
      v-for="item in items"
      @edit="edit"
      @prune="prune"
      class="item"
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

<style scoped lang="scss">
section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(332px, 1fr));

  gap: 1em;
}

.item {
  min-width: 332px;
  height: 423px;

  flex-grow: 1;
  flex-basis: 0;
}
</style>
