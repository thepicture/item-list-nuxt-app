<template>
  <form>
    <TextInput
      name="title"
      label="Наименование товара"
      placeholder="Введите наименование товара"
      mandatory
    />
    <TextInput
      name="description"
      label="Описание товара"
      placeholder="Введите описание товара"
      multiline
      class="description"
    />
    <TextInput
      name="imageLink"
      label="Ссылка на изображение товара"
      placeholder="Введите ссылку"
      mandatory
    />
    <TextInput
      name="priceInRubles"
      label="Цена товара"
      placeholder="Введите цену"
      mandatory
    />
    <Button type="submit">Добавить товар</Button>
  </form>
</template>

<script></script>

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
