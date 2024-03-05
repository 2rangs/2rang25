// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/ui', '@pinia/nuxt',],
  css: [ '/public/assets/main.scss'],
  //@ts-ignore
  head: {
    title: '2rang25',
    meta: [
      { charset: 'utf-8' },
      { name: '"google-adsense-account', content: 'ca-pub-5843730547937550' }
    ]
  }
})
