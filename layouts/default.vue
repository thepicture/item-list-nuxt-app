<template>
  <main>
    <h1>Добавление товара</h1>
    <Select :options="options" class="sort-selector"></Select>
    <AddItemForm class="form" :rules="rules" @input="input" />
    <ItemList :items="items" />
  </main>
</template>

<script>
import { Validator } from '@/features/validator/Validator';

const stubItemTemplate = {
  title: 'Наименование товара',
  description:
    'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
  imageLink:
    'https://media.wired.com/photos/5b64db3717c26f0496f4d62d/master/pass/Canon-G7XII-SOURCE-Canon.jpg',
  priceInRubles: 10000,
};

const sortOptions = [
  {
    content: 'По умолчанию',
    value: 'sortByNameAscending',
    selected: true,
  },
  {
    content: 'По цене по возрастанию',
    value: 'sortByPriceAscending',
  },
  {
    content: 'По цене по убыванию',
    value: 'sortByPriceDescending',
  },
  {
    content: 'По наименованию',
    value: 'sortByNameAscending',
  },
];

const rules = {
  title: {
    isValid: false,
    reason: '',
    value: '',
    isMandatory: true,
  },
  description: {
    isValid: false,
    reason: '',
    value: '',
    isMandatory: false,
  },
  imageLink: {
    isValid: false,
    reason: '',
    value: '',
    isMandatory: true,
    pattern: '^http(s)?:\\/\\/\\w+$',
    patternError: 'Введите ссылку в формате https://example.com/...',
  },
  priceInRubles: {
    isValid: false,
    reason: '',
    value: '',
    isMandatory: true,
    pattern: '^[0-9]{1,16}$',
    patternError: 'Цена должна быть числом',
  },
};

const stubItems = new Array(16)
  .fill(stubItemTemplate)
  .map((item, index) => ({ ...item, id: index + 1 }));

export default {
  data() {
    return {
      items: stubItems,
      options: sortOptions,
      rules,
      validator: new Validator(),
    };
  },
  methods: {
    input(event) {
      const { name, value } = event.target;

      this.validator.updateRulesInPlace(this.rules, name, value);

      console.log(this.rules);

      console.log(JSON.stringify(this.rules, null, '\t'));
    },
  },
};
</script>

<style scoped lang="scss">
main {
  position: relative;

  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;

  gap: 1em;
}

h1 {
  margin: 0;
}

.form {
  position: sticky;
  top: 2em;

  width: 25em;

  height: fit-content;
}

.sort-selector {
  justify-self: end;

  max-width: 10em;
}
</style>
