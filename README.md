# Invites — a `multi-tenant` Parallax Engine showcase

**Live:**
- 💍 Wedding: https://parallax-editor.github.io/demo-invites/luna-y-rio
- 🎈 Birthday: https://parallax-editor.github.io/demo-invites/fiesta-solar

Two demo invitations built with [Parallax Engine](https://github.com/parallax-editor/parallax-engine)'s
`multi-tenant` preset: every event is a **self-contained parallax site served at
its own URL** — no home, no public index, `robots.txt` disallows crawling. The
model behind private, share-by-link invitation deployments. (This demo repo is
public so you can read it; a real deployment would keep the repo private too.)

| luna-y-rio | fiesta-solar |
|---|---|
| ![Boda](docs/luna-y-rio.png) | ![Cumpleaños](docs/fiesta-solar.png) |

## What this demonstrates

- **Per-URL worlds.** `content/<slug>/site.json` → prerendered `/<slug>`. Nothing
  links them; guests only ever see the URL they were sent.
- **Two completely different vibes from one engine** — an elegant riverside
  night wedding (fireflies, golden floral fractals, calligraphy) and a vibrant
  kids' birthday (confetti rain on scroll, floating balloons) — purely by
  swapping `site.json` + PNG assets.
- **Built-in RSVP.** Each invitation embeds the engine's `FormBlock` component:
  validated fields, honeypot anti-spam, webhook POST, fully styleable from JSON.
- **OG previews.** Each site ships a 1200×630 `og-image.png` so WhatsApp/iMessage
  unfurls look right — the editor even blocks publishing without one in this preset.

## Run it

```bash
yarn install
yarn dev        # http://localhost:3000/luna-y-rio
yarn test       # schema + asset validation for every site.json
yarn generate   # static build → .output/public
```

## Deploy

Pushing to `main` triggers `.github/workflows/pages.yml`: validate → generate
with `NUXT_APP_BASE_URL=/demo-invites/` → publish to GitHub Pages.
`scripts/patch-sitehost-baseurl.mjs` is a temporary no-op-when-fixed shim for
subpath deployments.

## Sibling demo

The other workspace preset — a public linked-home portfolio — lives at
[demo-atlas](https://github.com/parallax-editor/demo-atlas).

## License

GPL-3.0-or-later, same as the engine.
