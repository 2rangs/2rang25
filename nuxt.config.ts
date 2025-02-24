// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true, // SSR 활성화
  nitro: {
    preset: "node-server",
    serveStatic: true,
    compatibilityDate: '2025-02-23',
  },
  devtools: { enabled: false },
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    "@nuxt/image",
    "@nuxtjs/sitemap",
    "@nuxtjs/color-mode",
      '@nuxtjs/tailwindcss',
    '@nuxt/content',
  ],
  css: [ '/public/assets/main.scss'],
  site: {
    url: 'https://2rang25.com',
  },
  typescript: {
    strict: true
  },
  vite : {
    css :{
      preprocessorOptions : {
        scss: {
          api: "modern",
        }
      }
    }
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