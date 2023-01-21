<template>
  <article
    :id="`item-${traits.id}`"
    @click="edit"
    :class="{ 'can-edit': traits.mine, new: isNew && traits.mine }"
  >
    <img
      :src="traits.imageLink"
      :alt="`${traits.title} | ${traits.description}`"
      loading="lazy"
      @error="replaceByDefaultImage"
    />
    <section>
      <h2>{{ traits.title }}</h2>
      <p>{{ traits.description }}</p>
      <p class="price">
        <strong>{{ formattedPriceInRubles }}</strong>
      </p>
    </section>
    <DeleteButton class="delete-icon" v-if="traits.mine" @prune="prune" />
  </article>
</template>

<script>
import { IMAGE_LOAD_FAIL_STUB_SRC } from '@/config/constants';

export default {
  props: {
    traits: {
      title: String,
      description: String,
      imageLink: String,
      priceInRubles: Number,
    },
  },
  data() {
    return { isNew: true };
  },
  computed: {
    formattedPriceInRubles() {
      const priceAsString = String(this.traits.priceInRubles);

      if (priceAsString.length > 3) {
        const indexOfSpace = Math.floor(priceAsString.length / 2);

        return `${priceAsString.slice(0, indexOfSpace)} ${priceAsString.slice(
          indexOfSpace
        )} руб.`;
      } else {
        return `${priceAsString} руб.`;
      }
    },
  },
  methods: {
    replaceByDefaultImage(event) {
      this.isImageLoadFailed = true;
      event.target.src = IMAGE_LOAD_FAIL_STUB_SRC;
    },
    prune() {
      this.$emit('prune', this.traits.id);
    },
    edit() {
      this.$emit('edit', this.traits.id);
    },
  },
  mounted() {
    this.timeout = setTimeout(() => (this.isNew = false), 2 * 1024);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
};
</script>

<style scoped lang="scss">
article {
  position: relative;

  border-radius: 4px;

  background: #fffefb;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04),
    0px 6px 10px rgba(0, 0, 0, 0.02);
}

h2 {
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 25px;

  color: #3f3f3f;
}

p {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;

  color: #3f3f3f;
}

.new {
  border: 3px solid #ff8484;
}

.can-edit {
  cursor: url('/hover.svg'), pointer;
}

section {
  padding: 0 2em;
}

img {
  margin: 0;
  padding: 0;

  width: 100%;
  height: 16em;
  height: 200px;

  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  object-fit: cover;
}

.price {
  padding-top: 8px;

  font-weight: 600;
  font-size: 24px;
  line-height: 30px;

  color: #3f3f3f;
}

.delete-icon {
  position: absolute;

  top: 0;
  right: 0;

  transform: translate(5px, -5px);
}
</style>
