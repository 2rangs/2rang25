// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    "@nuxt/image",
    "@nuxt/content",
    "@nuxtjs/sitemap",
    "@nuxtjs/color-mode"
  ],
  css: [ '/public/assets/main.scss'],
  site: {
    url: 'https://2rang25.com',
  },
  nitro: {
    routeRules: {
      // toast-ui editor 가 SSR 을 지원하지 않아 reload시 에러가 나는것을 방지
      "editor/toast": {
        ssr: false,
      },
    },
  },
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'google-adsense-account', content: 'ca-pub-5843730547937550' },
        { name: 'naver-site-verification', content: 'e4268532e2f91d996c09315dcad5114082f5af2e' },
      ],
      htmlAttrs: {
        lang: 'ko' // 원하는 언어 코드로 변경
      }
    }
  }
})