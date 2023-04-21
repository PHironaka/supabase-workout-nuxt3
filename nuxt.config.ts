// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase', '@nuxtjs/tailwindcss', '@nuxt/devtools'],

  // Defaults options
  tailwindcss: {
    exposeConfig: false,
    exposeLevel: 2,
    config: {
      purge: { content: ['./public/**/*.html', './pages/**/*.vue', './components/**/*.vue'] },
      theme: {
        extend: {
          colors: {
            'at-light-green': '#44ba9f',
            'at-green': '#286d5d',
            'light-grey': '#f1f1f1',
          },
        },
        fontFamily: {
          Poppins: ['Poppins, sans-serif'],
        },
        flex: {
          1: '1 1 0%',
          2: '2 2 0%',
        },
        container: {
          center: true,
          screens: {
            'lg': '1124px',
            'xl': '1124px',
            '2xl': '1124px',
          },
        },
      },
    },
    injectPosition: 'first',
    viewer: true,
  },

  devtools: true
})
