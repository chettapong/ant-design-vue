import { NuxtConfig } from '@nuxt/types'

interface LessLoader {
  lessOptions: Object | Function
  additionalData: String | Function
  sourceMap: Boolean
  webpackImporter: Boolean
}

export default <NuxtConfig>{
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Ant Design Vue Example',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['ant-design-vue/dist/antd.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '@/plugins/antd-ui' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // *** Experimentation before use of Nuxt 3***
    // TODO: Remove after use Nuxt 3
    // https://composition-api.nuxtjs.org/
    '@nuxtjs/composition-api/module',
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://github.com/nuxt-community/moment-module
    '@nuxtjs/moment'
  ],

  // Moment.js module configuration: https://github.com/nuxt-community/moment-module#configuratio
  moment: {
    defaultLocale: 'th',
    locales: ['th'],
    plugins: ['@chettapong/moment-buddhist-era.js']
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // Customize options of Nuxt.js integrated webpack loaders.: https://go.nuxtjs.dev/config-build#loaders
    extend(_config, ctx) {
      const less = ctx.loaders.less as LessLoader
      less.lessOptions = {
        javascriptEnabled: true
      }
    }
  }
}
