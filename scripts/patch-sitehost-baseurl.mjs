// TEMPORAL (hasta parallax-engine 0.2.7): SiteHost hace history.pushState con
// rutas raíz ("/", "/<slug>") sin respetar app.baseURL — bajo el subpath de
// GitHub Pages la URL queda fuera del repo. Este patch inyecta el baseURL en
// slugToUrl/urlToSlug del runtime instalado ANTES del build. Es un no-op si
// el engine ya viene arreglado (los patrones no matchean).
import { readFileSync, writeFileSync, existsSync } from 'fs'
const p = 'node_modules/@parallax-editor/parallax-engine/dist/nuxt/runtime/components/SiteHost.vue'
if (!existsSync(p)) process.exit(0)
let s = readFileSync(p, 'utf8')
const anchor = "const HOME_SLUG: string = cfg.homeSlug || 'home'"
const oldTo = "function slugToUrl(slug: string): string {\n  return slug === HOME_SLUG ? '/' : `/${slug}`\n}"
const oldFrom = "function urlToSlug(path: string): string {\n  if (!path || path === '/') return HOME_SLUG\n  return path.replace(/^\\/+|\\/+$/g, '').split('/')[0] || HOME_SLUG\n}"
if (!s.includes(oldTo) || !s.includes(anchor)) {
  console.log('[patch-sitehost] patrones no encontrados — engine ya arreglado, no-op')
  process.exit(0)
}
s = s.replace(anchor, anchor + "\n// [demo patch] baseURL-aware URLs bajo subpath (GitHub Pages)\nconst APP_BASE: string = (useRuntimeConfig()?.app?.baseURL || '/').replace(/\\/*$/, '/')")
s = s.replace(oldTo, "function slugToUrl(slug: string): string {\n  return slug === HOME_SLUG ? APP_BASE : APP_BASE + slug\n}")
s = s.replace(oldFrom, "function urlToSlug(path: string): string {\n  let p = path || '/'\n  if (APP_BASE !== '/' && p.startsWith(APP_BASE)) p = '/' + p.slice(APP_BASE.length)\n  if (!p || p === '/') return HOME_SLUG\n  return p.replace(/^\\/+|\\/+$/g, '').split('/')[0] || HOME_SLUG\n}")
// Scroll-reset robusto al navegar entre sitios: window.scrollTo simple pierde
// contra el smooth-scroll (lenis) que rehidrata la posición vieja — el mundo
// destino aparecía scrolleado abajo. Triple reset diferido con rAF.
const oldScroll = "  if (typeof window !== 'undefined') window.scrollTo(0, 0)"
const scrollFix = `  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0)
    requestAnimationFrame(() => {
      window.scrollTo(0, 0)
      requestAnimationFrame(() => window.scrollTo(0, 0))
    })
  }`
if (s.includes(oldScroll)) s = s.replace(oldScroll, scrollFix)
writeFileSync(p, s)
console.log('[patch-sitehost] SiteHost.vue parcheado con APP_BASE')
