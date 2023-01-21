<template>
  <main>
    <h1>Добавление товара</h1>
    <Select
      :options="options"
      :value="sortValue"
      @change="sortChange"
      class="sort-selector"
    ></Select>
    <AddItemForm class="form" :rules="rules" @input="input" @submit="submit" />
    <ItemList :items="items" @edit="edit" @prune="prune" />
  </main>
</template>

<script>
import { Validator } from '@/features/validator/Validator';
import {
  STUB_TITLE,
  STUB_DESCRIPTION,
  STUB_IMAGE_SRC,
  STUB_PRICE_IN_RUBLES,
  UNASSIGNED_ID,
} from '@/config/constants';

const stubItemTemplate = {
  title: STUB_TITLE,
  description: STUB_DESCRIPTION,
  imageLink: STUB_IMAGE_SRC,
  priceInRubles: STUB_PRICE_IN_RUBLES,
  mine: false,
};

const priceSorter = (items) =>
  items.sort((i1, i2) => i1.priceInRubles - i2.priceInRubles);
const nameSorter = (items) => items.sort((i1, i2) => i1.title - i2.title);

const sortOptions = [
  {
    content: 'По умолчанию',
    value: 'sortByNameAscending',
    selected: true,
    sorter: nameSorter,
  },
  {
    content: 'По цене по возрастанию',
    value: 'sortByPriceAscending',
    sorter: priceSorter,
  },
  {
    content: 'По цене по убыванию',
    value: 'sortByPriceDescending',
    sorter: (items) => priceSorter(items).reverse(),
  },
  {
    content: 'По наименованию',
    value: 'sortByNameAscending',
    sorter: nameSorter,
  },
];

const rules = {
  id: UNASSIGNED_ID,
  title: {
    isValid: false,
    reason: '',
    value: '',
    isMandatory: true,
  },
  description: {
    isValid: true,
    reason: '',
    value: '',
    isMandatory: false,
  },
  imageLink: {
    isValid: false,
    reason: '',
    value: '',
    isMandatory: true,
    pattern: '^http(s)?:\\/\\/.+$',
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
      sortValue: sortOptions[0].value,
      sortOptions,
    };
  },
  methods: {
    input(event) {
      const { name, value } = event.target;

      this.validator.updateRulesInPlace(this.rules, name, value);
    },
    async getIsImageLinkValid(src) {
      return await new Promise((resolve) => {
        const image = new Image();

        image.addEventListener('load', () => resolve(true));
        image.addEventListener('error', () => resolve(false));

        image.src = src;
      });
    },
    resetRules() {
      const keys = Object.getOwnPropertyNames(this.rules).filter(
        (rule) => !rule.startsWith('_')
      );

      for (const key of keys) {
        if (key === 'id') {
          this.rules[key] = 0;

          continue;
        }

        const rule = this.rules[key];

        rule.value = '';
        rule.isValid = false;
      }
    },
    async submit(event) {
      const isImageLinkValid = await this.getIsImageLinkValid(
        this.rules.imageLink.value
      );

      if (!isImageLinkValid) {
        const reason = `Ссылка на изображение \
          недействительна. \
          Операция добавления товара отменена`;

        this.rules.imageLink.reason = reason;
        this.rules.imageLink.isValid = false;

        return;
      }

      let id;

      if (this.items.length === 0) {
        id = 1;
      } else {
        const lastId = this.items
          .map((item) => item.id)
          .sort((id1, id2) => id2 - id1)[0];

        id = lastId + 1;
      }

      let items;

      if (this.rules.id === UNASSIGNED_ID) {
        items = [
          ...this.items,
          {
            id,
            title: this.rules.title.value,
            description: this.rules.description.value,
            imageLink: this.rules.imageLink.value,
            priceInRubles: this.rules.priceInRubles.value,
            mine: true,
          },
        ];
      } else {
        items = this.items.map((item) => {
          if (item.id === this.rules.id) {
            item = {
              ...item,
              title: this.rules.title.value,
              description: this.rules.description.value,
              imageLink: this.rules.imageLink.value,
              priceInRubles: this.rules.priceInRubles.value,
            };
          }

          return item;
        });
      }

      const sorter = this.getSorter(this.sortValue);

      console.log(sorter, this.sortValue);
      this.items = sorter(Object.assign([], items));

      this.resetRules();
      event.target.reset();

      setTimeout(() => (window.location.href = `#item-${id}`));
    },
    edit(id) {
      const item = this.items.find((item) => item.id === id);

      this.rules.id = id;
      this.rules.title.value = item.title;
      this.rules.description.value = item.description;
      this.rules.imageLink.value = item.imageLink;
      this.rules.priceInRubles.value = item.priceInRubles;

      this.makeRulesValid();
    },
    makeRulesValid() {
      this.rules.title.isValid = true;
      this.rules.description.isValid = true;
      this.rules.imageLink.isValid = true;
      this.rules.priceInRubles.isValid = true;
    },
    prune(id) {
      this.items = this.items.filter((item) => item.id !== id);
    },
    sortChange(value) {
      this.sortValue = value;
      this.items = this.getSorter(value)(Object.assign([], this.items));
    },
    getSorter(value) {
      return this.sortOptions.find((option) => option.value === value).sorter;
    },
  },
};
</script>

<style scoped lang="scss">
main {
  position: relative;

  display: grid;
  grid-template-columns: 332px 1fr;

  gap: 1em;
}

h1 {
  margin: 0;

  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 35px;

  color: #3f3f3f;
}

.form {
  position: sticky;
  top: 2em;

  height: fit-content;

  z-index: 1;
}

.sort-selector {
  justify-self: end;

  max-width: 10em;

  z-index: 1;
}

@media screen and (max-width: 640px) {
  main {
    grid-template-columns: 1fr;
  }

  .form {
    top: 4em;
  }

  .sort-selector {
    position: sticky;
    top: 1em;
  }
}
</style>
