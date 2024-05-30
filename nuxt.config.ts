// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  extends: ['@nuxt/ui-pro'],
  modules: ['@nuxt/ui', '@pinia/nuxt', "@nuxt/image", "@nuxt/content"],
  css: [ '/public/assets/main.scss'],
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
      title: '2rang25',
      meta: [
        { charset: 'utf-8' },
        { name: 'google-adsense-account', content: 'ca-pub-5843730547937550' },
        { name: 'description', content: '나만의 공간' },
      ],
      htmlAttrs: {
        lang: 'ko' // 원하는 언어 코드로 변경
      }
    }
  }
})