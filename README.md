# YOYO Pro Services

Website for YOYO Pro Services, a cleaning, remodeling, painting and moving business based in Brooklyn and working across New York City, New Jersey and Pennsylvania. Built by Novus.

The site explains what the business does and makes calling it the obvious next step. Pages: Home, About, Services and Contact.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 3
- Archivo, self-hosted with `@fontsource-variable/archivo` (no Google Fonts requests)
- No raster images: the drawings are inline SVG

## Scripts

```bash
npm install
npm run dev        # local development
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint (flat config in eslint.config.mjs)
npm run typecheck  # tsc --noEmit
```

## Where things live

- `src/lib/site.ts`: **every business fact** (name, owner, phones, Instagram, mailing address, service area, the four services and their taglines). Unknown facts such as email, hours and booking are `null`, and the UI hides them until they are filled in. Change facts here, not in the pages.
- `src/lib/metadata.ts`: `pageMetadata()`, used by every route for its title, description, canonical URL and Open Graph tags.
- `src/lib/components/`: header and mobile menu, footer, call button, closing call panel, the house drawing and the service line drawings.
- `src/app/`: routes, plus `icon.svg`, `apple-icon.tsx`, `opengraph-image.tsx`, `robots.ts`, `sitemap.ts` and `not-found.tsx`.
- `tailwind.config.ts` and `src/app/globals.css`: colour tokens, type roles and motion.
- `BUILD_NOTES.md`: art direction, sources, decisions, contrast table and the open items for the client.

## Environment

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | The public address of the site, for example `https://www.example.com`. Used for canonical URLs, Open Graph, the sitemap and robots.txt. If unset, the site falls back to `https://$VERCEL_PROJECT_PRODUCTION_URL` on Vercel, then `http://localhost:3000`. |

No domain is registered yet, so set this once one is chosen.
