// Valida cada content/<slug>/site.json contra el schema del engine y que
// TODOS los assets referenciados existan en disco. Falla el CI si algo drifta.
import { validateSite } from '@parallax-editor/parallax-engine/schema'
import { readFileSync, readdirSync, existsSync, statSync } from 'fs'
import { join } from 'path'

const root = new URL('..', import.meta.url).pathname
const contentDir = join(root, 'content')
let failed = 0
for (const slug of readdirSync(contentDir)) {
  const dir = join(contentDir, slug)
  if (!statSync(dir).isDirectory()) continue
  const file = join(dir, 'site.json')
  const site = JSON.parse(readFileSync(file, 'utf8'))
  const r = validateSite(site)
  if (!r.ok) { console.error(`✗ ${slug}: schema inválido`, r.errors); failed++; continue }
  // assets referenciados deben existir
  const missing = []
  const visit = (sections) => {
    for (const s of sections || []) for (const l of s.layers || []) for (const el of l.elements || []) {
      if (el.src && !el.src.startsWith('http') && !existsSync(join(dir, el.src))) missing.push(el.src)
    }
  }
  visit(site.sections)
  if (site.views) { visit(site.views.desktop?.sections); visit(site.views.mobile?.sections) }
  if (site.meta?.ogImage && !existsSync(join(dir, site.meta.ogImage))) missing.push(site.meta.ogImage)
  if (missing.length) { console.error(`✗ ${slug}: assets faltantes:`, missing); failed++; continue }
  console.log(`✓ ${slug} — válido, assets completos`)
}
process.exit(failed ? 1 : 0)
