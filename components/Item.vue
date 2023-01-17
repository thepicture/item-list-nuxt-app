<template>
  <article>
    <img :src="traits.imageLink" loading="lazy" />
    <section>
      <h2>{{ traits.title }}</h2>
      <p>{{ traits.description }}</p>
      <p class="price">
        <strong>{{ traits.priceInRubles }} руб.</strong>
      </p>
    </section>
  </article>
</template>

<script>
export default {
  props: {
    traits: {
      title: String,
      description: String,
      imageLink: String,
      priceInRubles: Number,
    },
  },
};
</script>

<style scoped>
article {
  border-radius: 0.3em;

  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  background-color: white;
}

section {
  padding: 0 2em;
}

img {
  margin: 0;
  padding: 0;

  max-width: 100%;

  border-top-left-radius: 0.3em;
  border-top-right-radius: 0.3em;
}

.price {
  padding-top: 1em;
  font-size: 1.5em;
}
</style>
