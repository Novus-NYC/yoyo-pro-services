# YOYO Pro Services: build notes

Novus assignment 13. Brief: "Build a simple, mobile-friendly website that explains what the business does and helps potential customers get in touch. Include: Home, About, Services, and Contact sections. Confirm the services with the owner before writing the final copy."

Routes: `/` Home, `/about`, `/services`, `/contact`, plus a server-rendered 404.

## Art direction

**Blueprint and sign paint.** The site draws the customer's home like a section drawing on navy blueprint paper (precise, careful, credible) and paints every call to action on a gold sign panel, the way a trade's name and number are lettered on a van door (bold, energetic, impossible to miss). There are no real photos, so the drawings and the type carry the brand.

- **Hero:** a house cut open into four rooms, one per service, drawn in paper line with a gold roof. Beside it the business's own line, "We take care of your space.", and one gold button: Call 929-606-6927.
- **Home:** the four services as a floor plan (rooms with walls and door swings, each room linking to its service), then who and where, then the gold "van door" panel with the number painted big.
- **About:** the company set out like the title block in the corner of a drawing sheet; the owner; the service area on blueprint; a key of the four trades.
- **Services:** one band per service, each with a framed "detail drawing" and its own tagline and call button. An in-page key jumps to each band.
- **Contact:** the number set huge in gold on navy, then a notes column (when you call, where we work, mailing address).

### Palette (tokens in `tailwind.config.ts` and `globals.css`)

| Role | Token | Hex |
|---|---|---|
| Primary: drafting field, all text on light grounds | `navy` | #15264F |
| Footer, scrolled header | `navy-deep` | #0E1B3B |
| Secondary: action fill, roof line, marker | `gold` | #F6B91C |
| Gold hover | `gold-deep` | #E9A90A |
| Room hover, light highlight surface | `gold-tint` | #FDEFC8 |
| Supplemental: line work and quiet labels on navy | `blueprint` | #9DB2E0 |
| Canvas | `paper` | #F7F5EF |
| Alternate canvas | `paper-2` | #EDE9DF |
| Muted text on light grounds | `muted` | #4D5875 |
| Decorative rules on paper | `rule` | #CFC9BA |
| Plan line work (door swings, dimension lines) | `plan` | #7E8BAA |

Gold is never used as text on a light ground (1.6:1). On paper it is only a fill, with navy text and a navy 2 px edge carrying the button boundary.

### Type

One family, **Archivo** (variable, self-hosted with `@fontsource-variable/archivo`, width and weight axes), used at three widths:
- Display: width 125%, weight 800 (`.display`): the sign-painter's voice for headings and the big number.
- Labels: width 85%, weight 650, spaced caps (`.label`): the annotations on a drawing.
- Body: width 100%, weight 400 to 600.

The Open Graph image uses static Archivo 600 and 800 from `@fontsource/archivo` (Satori cannot read variable WOFF2).

### Motion
- Scroll reveals (`.reveal`): 550 ms fade and 16 px rise, hidden only under `html.js`.
- Signature: a gold highlighter runs under key words when their heading enters view (`transform: scaleX`), and on load in the hero.
- Hero: copy rises once on load; the four rooms of the house drawing fade in one after another (pure CSS).
- Plan rooms tint gold on hover and focus.
- `prefers-reduced-motion` and `print` overrides repeat every hidden state at equal or higher specificity. Hash targets (the service sections) are never translated.

## Verified facts used (sources)

All business facts live in `src/lib/site.ts`. Unknowns are `null` and their UI renders nothing.

| Fact | Value on the site | Source |
|---|---|---|
| Name | YOYO Pro Services (running text); YOYO Pro Services LLC (footer legal line only) | Instagram profile; NYS DOS registry, DOS ID 8044667 |
| Owner | Ericson J. Ventura, CEO (as the owner wrote it) | Owner's message; registry names the same person |
| Experience | "Ericson J. Ventura brings more than 10 years of experience." About page only | Owner's message ("10 years or more experience"), not publicly verified |
| Main line | We take care of your space. | Reel caption, flyers |
| Team line | One team. Multiple solutions. | Reel caption |
| Promise | At YOYO Pro Services, we turn ordinary spaces into extraordinary places, whether you need a clean home or a beautiful renovation. | Instagram bio |
| Pitch | Whether you need a sparkling clean home, a beautiful renovation, a fresh coat of paint or a stress-free move ... | Reel caption (adapted) |
| Services | Cleaning, Remodeling, Painting, Moving | Reel caption and flyers |
| Service area | New York City, New Jersey and Pennsylvania | Instagram bio hashtags (#nyc #NJ #PA) |
| Base | Based in Brooklyn | Registry county (Kings); caption hashtag BrooklynNY |
| Phone | 929-606-6927 (primary CTA), 929-852-8456 ("Second line") | Reel caption and both flyers |
| Instagram | https://www.instagram.com/yoyoproservices/ (@yoyoproservices) | Owner's message |
| Mailing address | 169 Madison Ave, Suite 66927, New York, NY 10016, labelled "Mailing address" and "For post only" | Printed on both flyers as "Our Address" |

### The four taglines (confirm with owner)

The assignment says to confirm the services with the owner before final copy. The Services page uses only the business's own taglines from the reel caption, rewritten without the caption's dashes. **Each needs the owner's confirmation:**

1. Cleaning: "A fresher, healthier space." **(confirm with owner)**
2. Remodeling: "Transform your home with style." **(confirm with owner)**
3. Painting: "Bring new life to your walls." **(confirm with owner)**
4. Moving: "Making your move easier and stress-free." **(confirm with owner)**

No scope, bullet lists, prices or process steps are written for any service. Each band says only its name, its tagline and "Call about [service]".

## Decisions

Lead decisions (2026-11-17), followed as written:
- Type-led design with drawn motifs; no images from Instagram at all (the AI flyers, the reel frames and the 150 px badge are excluded). The logo is not recreated or traced: the wordmark is set in Archivo ("YOYO" in paper or navy, "PRO" in navy on a gold block as a colour nod, "Services" as a label), and the favicon is a drawn "YP" monogram.
- Services page uses only the four taglines (above). The 15% first-service promo is left off.
- Primary CTA everywhere: **Call 929-606-6927** (`tel:+19296066927`). 929-852-8456 is listed as "Second line". Instagram link has no tracking parameters.
- No email, form, hours or booking link (all `null`).
- Mailing address shown as a mailing address only: no map, no directions, no "visit us", no geo, not in structured data. The Brooklyn operations address and the EIN appear nowhere.
- No "licensed", "insured", "certified", reviews, ratings or testimonials. The flyer trust row ("Trusted Professionals", "On Time, Every Time") is not used.
- The business is never described as 10 years old (it was registered in October 2026).

Build decisions:
- **No photos at all.** None exist (everything public is AI-generated). `site.photos` is `null`, ready for real job, team or van photos.
- **Structured data:** a schema.org Organization on the home page with name, slogan, phone, Instagram, the three service areas and Ericson J. Ventura as an employee with the title CEO (not "founder": no source says he founded it). No address, no geo, no hours, no legal name.
- **No redirects:** yoyoproservices.com is not registered, so there is no old site.
- **Site URL** comes from `NEXT_PUBLIC_SITE_URL`, then `VERCEL_PROJECT_PRODUCTION_URL`, then `http://localhost:3000`. robots.txt only advertises the sitemap when a public URL is set.
- **Without JavaScript** the mobile menu cannot open, so a link to the footer's page list replaces the toggle (CSS under `html:not(.js)`).
- **The big phone number** is sized with container query units so its twelve characters always fit their column on one line.

## Contrast (WCAG 2.x)

| Pair | Ratio | Use |
|---|---|---|
| navy on paper | 13.55 | body and headings |
| navy on paper-2 | 12.18 | alternate sections |
| navy on white | 14.77 | title block, notes, detail frames |
| navy on gold | 8.35 | buttons, closing panel, marker text |
| navy on gold-deep | 7.13 | button hover |
| navy on gold-tint | 12.91 | room and link hover |
| muted on paper | 6.49 | secondary text |
| muted on paper-2 | 5.84 | secondary text |
| muted on white | 7.07 | secondary text |
| muted on gold-tint | 6.18 | room tagline on hover |
| muted on drafting-paper grid line (about #E5E1D6) | 5.41 | worst case on the squared paper |
| paper on navy | 13.55 | hero and contact text |
| paper on navy-deep | 15.55 | footer text, scrolled header |
| gold on navy | 8.35 | big number on Contact, "You are here" |
| gold on navy-deep | 9.59 | footer hover |
| blueprint on navy | 6.95 | labels on navy |
| blueprint on navy-deep | 7.98 | footer labels and summary |
| blueprint on a blueprint grid line (about #2C3D67) | 5.01 | worst case on the grid |
| gold on paper | 1.62 | **never text**; gold buttons on paper carry a navy 2 px edge |
| plan on paper | 3.13 | door swings and dimension lines (non-text graphics) |

Focus rings: 3 px navy on light grounds (13.55), 3 px gold on navy (8.35), navy on gold (8.35). Every control is at least 44 px tall.

## Images

No raster images are used. Everything visual is drawn for this site in SVG:
- `src/lib/components/house-section.tsx`: the hero house section.
- `src/lib/components/service-glyph.tsx`: spray bottle, hammer over a rule, paint roller, moving boxes.
- `src/lib/components/plan.tsx`: plan doors with swings.
- `src/app/icon.svg`, `src/app/apple-icon.tsx`: "YP" monogram.
- `src/app/opengraph-image.tsx`: type-only share image.

Excluded on purpose (lead decision): the Instagram post flyer (1440 px, AI-generated, labelled "AI content"), the reel cover and first frame (640 px, AI-generated, with AI people who are not real staff), the 150 px profile badge and the highlight cover.

## Checks run

- `npm run build`, `npm run lint`, `npm run typecheck`: pass with no errors or warnings.
- Production build on port 3022, screenshots of every route at 1440, 768 and 390 (Playwright).
- No horizontal overflow at 360, 375, 380, 390, 414, 600, 767, 768, 900, 1023, 1024, 1280 and 1440 on any route.
- Mobile hero at 390 x 844: name, what it does and the call button all sit above the fold (button bottom at 445 px); hero block 816 px tall.
- Mobile menu: dialog is a sibling of the header; everything outside is inert while open; focus moves to Close; Tab and Shift+Tab stay inside; Escape closes and returns focus to the toggle; closes at the desktop breakpoint, on route change and on browser Back.
- JavaScript off and reduced motion: no `.reveal` content stays hidden. Anchor jumps land exactly under the header.
- Visible copy, metadata, alt text and JSON-LD checked for em dashes, en dashes and leading zeroes: none.

## Open items for the client

1. **Services:** confirm the four taglines above, and what each service covers: residential or commercial; which kinds of cleaning; how big a remodel; interior or exterior painting; local or long-distance moves, and whether a truck is provided. Once confirmed, each service band can take a short scope list.
2. **Service area:** is "New York City, New Jersey and Pennsylvania" accurate? Which boroughs or areas?
3. **"Based in Brooklyn":** happy with that wording on the site?
4. **Phones:** which number is the main line? Does either take texts or WhatsApp? Should both be listed?
5. **Experience:** confirm "Ericson J. Ventura brings more than 10 years of experience", and that it is his personal experience.
6. **Mailing address:** keep it on the site? Is "169 Madison Ave" (rather than "Av") fine?
7. **Email address:** none was found.
8. **Hours or availability:** none stated.
9. **Booking:** is phone the only way to book? Would you like a quote request form (and where should submissions go)?
10. **New-customer offer:** the flyer's 15% off first service, "available to December 31, 2026", is left off. Add it, and what happens after it expires?
11. **Licensing and insurance:** nothing is claimed. Do you hold a NYC DCWP Home Improvement Contractor license, NYS DOT authority for moving household goods, or liability insurance? Claims go on the site only once confirmed.
12. **Photos:** real photos of finished jobs (before and after), the team, uniforms and vehicles, with permission to use them.
13. **Logo:** original or vector files, whether the current logo is final, and whether it was AI-generated.
14. **Reviews:** none exist publicly; none are on the site.
15. **Display name:** "YOYO Pro Services" in running text, OK?
16. **Language:** is a Spanish version or a "Se habla español" note wanted?
17. **Domain:** yoyoproservices.com is not registered. Which domain will the site use? Set `NEXT_PUBLIC_SITE_URL` to it.
