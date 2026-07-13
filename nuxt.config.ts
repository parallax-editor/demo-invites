// Showcase del preset `multi-tenant`: cada invitación es su propio sitio
// autocontenido en `/<slug>` — sin home, sin índice público, robots
// Disallow (el modelo real de invitaciones privadas por URL). Nota: en un
// deploy real el repo también sería privado; aquí es público porque es
// una demo de la organización.
export default defineNuxtConfig({
  modules: [
    '@parallax-editor/parallax-engine/nuxt',
    '@nuxtjs/google-fonts',
  ],

  parallax: {
    preset: 'multi-tenant',
    siteUrl: process.env.SITE_URL || 'https://parallax-editor.github.io/demo-invites',
  },

  googleFonts: {
    families: {
      'Cormorant Garamond': [400, 500, 600],
      'Great Vibes': [400],
      'Baloo 2': [500, 700],
      'Inter': [400, 500],
    },
    display: 'swap',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'es' },
    },
  },

  compatibilityDate: '2024-07-01',
})
