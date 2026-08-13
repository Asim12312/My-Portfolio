# Muhammad Asim — Portfolio

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · TypeScript.
Statically generated: the homepage, `/work`, three case-study pages and every OG image
are prerendered at build time.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build + type check
npm run lint
```

## Editing content

**Everything you'll want to change lives in [`lib/content.ts`](lib/content.ts).** The homepage,
case studies, sitemap, JSON-LD structured data and OG images all read from it — nothing is
hard-coded in components.

| What | Where |
| --- | --- |
| Name, email, phone, links, availability, education | `content.ts` → `PROFILE` |
| The four headline numbers | `content.ts` → `STATS` |
| Jobs and bullet points | `content.ts` → `ROLES` |
| Stack groupings | `content.ts` → `SKILL_GROUPS` |
| Stated engineering positions ("How I work") | `content.ts` → `PRINCIPLES` |
| Footer colophon | `content.ts` → `COLOPHON` |
| Nav items | `content.ts` → `NAV_LINKS` |
| Projects **and their full case studies** | [`lib/projects.ts`](lib/projects.ts) |

`content.ts` re-exports everything from `projects.ts`, so importing from
`@/lib/content` still gets you all of it.

### Adding a case study

Set `featured: true` on a project and fill in `context`, `problem`, `approach`,
`architecture`, `decisions`, `impact` and `learned`. A page appears at `/work/<slug>`
automatically, with its own OG image, sitemap entry and structured data. Projects with
`featured: false` render as a compact list under "also built".

### Adding screenshots

Drop files in `public/assets/shots/`, then add a `media` array to the project:

```ts
media: [
  {
    src: "/assets/shots/chefos-kds.png",
    alt: "Kitchen Display System showing four in-progress tickets",
    caption: "The KDS updates over Socket.io as orders are fired from the floor.",
    width: 2400,      // intrinsic pixel size — required, prevents layout shift
    height: 1500,
  },
]
```

The block renders **only when `media` exists**, so an unillustrated case study shows
nothing rather than an empty frame.

### Architecture diagrams

Each featured project has a `diagram` — tiers of nodes rendered as a layered block
diagram (columns on desktop, stacked on mobile). It's semantic HTML, not SVG, so it
reflows, inherits the theme, and reads correctly to a screen reader. `accent: true` marks
the tier that carries the interesting idea.

## Design system

Typography carries the design; colour is one accent plus neutrals.

- `--font-display` **Inter Tight** — headings
- `--font-body` **Inter** — body copy
- `--font-mono` **JetBrains Mono** — code and metadata
- `--brand` — the single accent (deep emerald in light, mint in dark)
- `--prose` — body-copy ink, a notch softer than heading ink

Utilities in `app/globals.css`:

| Class | Use |
| --- | --- |
| `.prose-block` | long-form text — caps the measure at **68ch**, sets 1.75 line-height |
| `.lead` | intro paragraph, 62ch |
| `.measure` | 68ch cap without changing type |
| `.label` | uppercase mono eyebrow (sets its own colour — don't combine with `text-*`) |
| `.surface` / `.surface-hover` | hairline card with soft elevation |
| `.btn` + `.btn-primary` / `.btn-brand` / `.btn-ghost` | buttons |
| `.tag` / `.tag-brand` | small metadata chips |

**The measure cap is the important one.** Before it, paragraphs ran to ~95 characters per
line, which is the main reason long text felt tiring to read.

## Before you send this to a recruiter

1. **Set the real dates** for `ROLES[1].period` — the mentored client work currently reads
   "Aug 2024 — Jan 2026 · 1.5 years".
2. **Never import IntelliBid's landing-page figures.** The deployed demo displays
   "120,000+ members", "$48M+ bid volume" and "98.4% satisfaction". Those are seeded demo
   data. They are deliberately excluded from `projects.ts` and must stay excluded — one
   follow-up question in an interview would expose them and cost you the room.
3. **Replace every value in `PROJECTS[].impact` with a number you can defend.** "Cut p95
   from 800 ms to 120 ms" beats "Live"; a measurement always outranks a capability.
4. **Add screenshots.** The case studies are strong on reasoning and have no images yet.
   Drop PNGs into `public/assets/` and render them in the case-study template.
5. **Check the résumé PDF** at `public/assets/resume.pdf` matches the site — especially the
   merged experience entry, the 3.61 CGPA, and IntelliBid, which was previously absent.
6. **Point `SITE_URL`** at your real domain if you move off the Vercel subdomain; it drives
   canonical URLs, the sitemap and OG metadata.

## Analytics

`@vercel/analytics` is mounted in `app/layout.tsx`. It is cookieless, needs no consent
banner, and is inert in development and on non-Vercel hosts — so local runs are unaffected.
**Turn it on in the Vercel project's Analytics tab after the first deploy**, otherwise it
collects nothing.

What to actually watch: whether `/work/[slug]` views are anywhere near `/` views. If people
land and never open a case study, the homepage isn't selling the work hard enough.

## Contact form

Uses [Web3Forms](https://web3forms.com). The access key is public by design but is read from
`NEXT_PUBLIC_WEB3FORMS_KEY` so it can be rotated without a code change:

```bash
# .env.local
NEXT_PUBLIC_WEB3FORMS_KEY=your-key-here
```

A hidden honeypot field silently drops bot submissions.

## Routes

| Route | What it is |
| --- | --- |
| `/` | Hero → stats → about → experience → work → approach → contact |
| `/work` | Case-study index |
| `/work/[slug]` | Four full case studies, statically generated |
| `/resume` | HTML résumé built from the same data as the site |
| `/sitemap.xml`, `/robots.txt` | Generated |

`/resume` exists alongside the PDF because recruiters often read in the browser, and
because ATS and search engines parse HTML where they can't parse a PDF. It prints cleanly —
see the `@media print` block in `globals.css`, which forces the light palette, hides
chrome, and appends link targets so a paper copy still carries the URLs.

## Notable implementation details

- **Nothing animates React.** No `requestAnimationFrame` → `setState` loops; scroll progress
  is rAF-throttled and writes one style property.
- **Reduced motion is respected in JS as well as CSS** (`usePrefersReducedMotion`), so the
  hero code sample renders complete instead of typing itself out.
- **Content survives without JS.** Scroll-reveal only hides content inside
  `@media (scripting: enabled)`.
- **Headings can break.** `overflow-wrap: break-word` plus `text-wrap: balance` on `h1–h4`
  stops a long word at 4.6rem from pushing the viewport sideways.
- **⌘K command palette** with arrow-key navigation, focus restore and scroll locking.
  Everything it reaches is also reachable by ordinary link, so nothing depends on it.
