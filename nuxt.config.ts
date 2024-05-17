// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  nitro: {
    experimental: { websocket: true }
  },
  extends: ['@nuxt/ui-pro'],
  modules: ['@nuxt/ui', '@pinia/nuxt', "@nuxt/image"],
  css: [ '/public/assets/main.scss'],
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