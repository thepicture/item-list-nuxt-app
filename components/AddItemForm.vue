<template>
  <form @submit.prevent="submit">
    <TextInput
      name="title"
      label="Наименование товара"
      placeholder="Введите наименование товара"
      mandatory
      :rule="rules.title"
      :value="rules.title.value"
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
    <Button type="submit" :enabled="canAddItem">{{
      rules.id ? 'Обновить товар' : 'Добавить товар'
    }}</Button>
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
        .filter((key) =>
          ['__ob__', 'id'].every((bannedKey) => key !== bannedKey)
        )
        .map((key) => this.rules[key].isValid)
        .every((validState) => validState);
    },
  },
};
</script>

<style scoped lang="scss">
form {
  padding: 2em;

  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04),
    0px 6px 10px rgba(0, 0, 0, 0.02);
  border-radius: 4px;

  background: var(--form-background-color);
}

button {
  margin-top: 1.5em;
}

.description {
  height: 16em;
}

@media screen and (max-width: 640px) {
  .description {
    height: auto;
  }
}
</style>
