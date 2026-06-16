// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },
  app: {
    head: {
      title: 'HiddenGemBooth - Premium Photobooth',
      meta: [
        { name: 'description', content: 'Premium Photobooth Experience' }
      ]
    }
  }
})