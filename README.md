# Fahmida Sultana — Portfolio (Next.js + CMS)

Neo-brutalist educator portfolio built with **Next.js 16 · React 19 · Tailwind CSS v4 · Motion · Lenis**, exported as a fast static site for **Cloudflare Pages**, with a visual editor (**Decap CMS**) at `/admin`.

- Smooth scrolling (Lenis), letter-by-letter hero reveal, scroll-velocity marquees, parallax portrait with a colour-reveal spotlight, magnetic buttons, spring menus and animated tabs.
- All text, images, menu links, colours and sections can be edited from the browser. You can add, reorder, hide or delete sections and create new pages without touching code.
- No database and no paid service. Content is stored as JSON in this repo. Each save from the editor is a commit, and Cloudflare redeploys automatically (about 1–2 minutes).

---

## 1. Run it locally

```bash
npm install
npm run dev            # site at http://localhost:3000
npm run dev:cms        # site + local editor (no login): http://localhost:3000/admin/index.html
npm run build          # production build -> /out
```

Requires Node 20.9+ (`.nvmrc` pins 22).

## 2. Deploy to Cloudflare Pages

1. Push this folder to a new GitHub repository.
2. In Cloudflare, go to **Workers & Pages → Create → Pages → Connect to Git** and select the repo.
3. Build settings:
   - Framework preset: **Next.js (Static HTML Export)**
   - Build command: `npm run build`
   - Build output directory: `out`
4. Save and deploy. Every push to `main` (including CMS edits) redeploys.

The `functions/` folder is detected automatically by Cloudflare. It powers the editor login.

## 3. Turn on the online editor (one-time, ~5 minutes)

1. **Point the CMS at your repo.** Open `public/admin/config.yml` and set:
   ```yaml
   backend:
     repo: your-github-username/your-repo-name
   ```
2. **Create a GitHub OAuth App** at GitHub → Settings → Developer settings → OAuth Apps → New OAuth App:
   - Homepage URL: `https://your-site.pages.dev` (or your custom domain)
   - Authorization callback URL: `https://your-site.pages.dev/api/callback`
   - Click "Generate a new client secret" and copy both the ID and the secret.
3. **Add them to Cloudflare** under Pages project → Settings → Variables and secrets (Production):
   - `GITHUB_CLIENT_ID` = the client ID
   - `GITHUB_CLIENT_SECRET` = the secret (choose **Encrypt**)
4. Redeploy (Deployments → Retry), then open **`https://your-site.pages.dev/admin/`** and log in with GitHub.

Only GitHub accounts with write access to the repo can edit. To let Fahmida edit, add her as a collaborator on the repo.
If you later add a custom domain, update the OAuth App URLs to that domain and edit from it.

---

## 4. Editing guide

**Pages → Home** holds the homepage, which is built from stacked **sections**:

| Action | How |
|---|---|
| Edit text or images | Expand a section, change the fields, then click **Publish → Publish now** |
| Reorder sections | Drag the ═ handle on a section |
| Hide temporarily | Turn on **Hide this section** |
| Add a section | **Add section ▾** and pick a block type |
| New page | **Pages → + Page**. It goes live at `/page-title/`. Add it to the menu in Site settings → Menu links |
| Menu, contact, footer, SEO, colours | **Site settings** |
| Make a menu link jump to a section | Give the section an **Anchor ID** (e.g. `story`) and link to `/#story` |
| Bold text in short fields | `**like this**` |

**Available section blocks**

- Hero
- Marquee
- About
- Cards grid
- Tabs + tiles
- Featured highlight
- Ledger list
- Principles grid
- Text / Story (rich text)
- Image + Text
- Photo gallery with lightbox
- Testimonials
- Call-to-action banner
- Video (YouTube / Vimeo)

**Images:** upload them in the editor (Media). They're saved to `public/uploads/`. For the hero portrait, a PNG or WebP with a transparent background around 900px wide works best. The black-and-white look is applied automatically.

**CV / documents:** upload the PDF via Media, then set Site settings → Header button → Link to `/uploads/your-file.pdf`.

> Don't delete the page named **home**: it's the homepage.

---

## 5. For developers: adding a new block type

1. Add its TypeScript type to `lib/types.ts`.
2. Create the component in `components/blocks/` and register it in `components/BlockRenderer.tsx`.
3. Add its fields to the CMS. Either edit `public/admin/config.yml` directly, or add it to `scripts/generate-cms-config.py` and run `python3 scripts/generate-cms-config.py` (needs `pyyaml`).

## Project structure

```
app/                 layout, home page, dynamic [slug] pages, fonts
components/          Header, Footer, SmoothScroll, Icon, BlockRenderer
components/blocks/   one file per section type
components/motion/   Reveal, SplitText, CountUp, Magnetic, VelocityMarquee
content/settings.json    global settings (edited in CMS)
content/pages/*.json     pages + their sections (edited in CMS)
public/admin/        Decap CMS (index.html + config.yml)
public/uploads/      images and files
functions/api/       Cloudflare Pages Functions for GitHub login
```

Fonts: Inter (SIL OFL 1.1), self-hosted via `next/font`.
