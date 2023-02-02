export default {
  head: {
    target: 'static',
    router: {
      base: '/item-list-nuxt-app/',
    },
    generate: {
      dir: 'docs',
    },
    title: 'item-list-nuxt-app',
    htmlAttrs: {
      lang: 'ru',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: ['~/static/global.scss'],

  plugins: [],

  components: true,

  buildModules: [],

  modules: [],

  build: {},
};
