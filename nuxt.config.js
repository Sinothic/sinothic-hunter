export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Sinothic Hunter - Shopify Inspector',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.BACKEND_URL,
    },
  },

  loading: '~/components/LoadingSpinner.vue',

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'vue-sweetalert2/nuxt',
    '@nuxtjs/dotenv',
    '@nuxtjs/auth-next',
  ],
  // Auth module options
  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/',
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          required: true,
          type: false,
        },
        endpoints: {
          login: { url: '/api/auth/login', method: 'post' },
        },
      },
    },
  },
  router: {
    middleware: ['auth'],
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  target: 'static',
  ssr: false,

  //modules configuration
  sweetalert: {
    confirmButtonColor: '#60a5fa',
    cancelButtonColor: '#ff7674',
  },
}
