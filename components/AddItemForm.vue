<template>
  <form @submit.prevent="submit">
    <TextInput
      name="title"
      label="Наименование товара"
      placeholder="Введите наименование товара"
      mandatory
      :rule="rules.title"
      @input="input"
    />
    <TextInput
      name="description"
      label="Описание товара"
      placeholder="Введите описание товара"
      multiline
      class="description"
      :rule="rules.description"
      @input="input"
    />
    <TextInput
      name="imageLink"
      label="Ссылка на изображение товара"
      placeholder="Введите ссылку"
      mandatory
      :rule="rules.imageLink"
      @input="input"
    />
    <TextInput
      name="priceInRubles"
      label="Цена товара"
      placeholder="Введите цену"
      mandatory
      :rule="rules.priceInRubles"
      @input="input"
    />
    <Button type="submit" :enabled="canAddItem">Добавить товар</Button>
  </form>
</template>

<script>
export default {
  props: ['rules'],
  emits: ['input'],
  methods: {
    input(event) {
      this.$emit('input', event);
    },
    submit(event) {
      this.$emit('submit', event);
    },
  },
  computed: {
    canAddItem() {
      return Object.getOwnPropertyNames(this.rules)
        .filter((key) => key !== '__ob__')
        .map((key) => this.rules[key].isValid)
        .every((validState) => validState);
    },
  },
};
</script>

<style scoped lang="scss">
form {
  padding: 2em;

  border-radius: 0.3em;

  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  background-color: white;
}

button {
  margin-top: 1.5em;
}

.description {
  height: 16em;
}
</style>
