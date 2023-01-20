<template>
  <article>
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
        <strong>{{ traits.priceInRubles }} руб.</strong>
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
  methods: {
    replaceByDefaultImage(event) {
      this.isImageLoadFailed = true;
      event.target.src = IMAGE_LOAD_FAIL_STUB_SRC;
    },
    prune() {
      this.$emit('prune', this.traits.id);
    },
  },
};
</script>

<style scoped>
article {
  position: relative;
  border-radius: 0.3em;

  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background-color: white;

  cursor: pointer;
}

section {
  padding: 0 2em;
}

img {
  margin: 0;
  padding: 0;

  width: 100%;
  height: 16em;
  max-width: 100%;

  border-top-left-radius: 0.3em;
  border-top-right-radius: 0.3em;

  object-fit: cover;
}

.price {
  padding-top: 1em;

  font-size: 1.5em;
}

.delete-icon {
  position: absolute;

  top: 0;
  right: 0;

  transform: translate(5px, -5px);
}
</style>
