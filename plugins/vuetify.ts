// plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    theme: {
      defaultTheme: 'light', // Switch to light mode
      themes: {
        // Light theme with new palette
        light: {
          dark: false,
          colors: {
            background: '#ffffff',
            surface: '#ffffff',
            'surface-bright': '#ffffff',
            'surface-variant': '#f3f4f6',
            'on-surface-variant': '#6b7280',
            primary: '#1A4B99', // New blue
            'primary-darken-1': '#1A4B99',
            secondary: '#e5e7eb',
            'secondary-darken-1': '#d1d5db',
            error: '#dc2626',
            info: '#1A4B99',
            success: '#99CC33', // New green
            warning: '#d97706',
            'on-background': '#000000', // black text
            'on-surface': '#000000',
            'on-primary': '#ffffff',
            'on-secondary': '#000000',
          },
        },
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})