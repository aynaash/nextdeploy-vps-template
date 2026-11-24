# NextDeploy Template

A full-stack **Next.js** starter — auth and Postgres included — that deploys to
a VPS **you own** with one command.

- **Next.js 16.4.6** (App Router, Server Components, Server Actions, TypeScript strict)
- **[better-auth](https://better-auth.com)** — email + password, sessions in Postgres
- **[Neon](https://neon.tech)** — serverless Postgres (free tier is plenty)
- **[Drizzle ORM](https://orm.drizzle.team)** — typed schema, `db:push` migrations
- **[zod](https://zod.dev)** — validated env (`src/lib/env.ts`) and Server Action inputs
- **Tailwind CSS v4**
- **[`nextdeploy.yml`](./nextdeploy.yml)** — the whole deploy, one committed file

### What's wired

- **Auth** — sign up / in / out, protected `/dashboard/*`, `?redirect=` handling
- **A data-driven dashboard** — Overview, Projects (full CRUD via Server Actions),
  and Settings, all reading/writing real rows in Postgres (no mock JSON)
- **`GET /api/health`** — DB-checked readiness probe for zero-downtime deploys
- **Edge proxy** — optimistic auth redirect + baseline security headers (`src/proxy.ts`)
- **SEO & PWA assets** — generated `robots`, `sitemap`, `manifest`, favicon, and a
  dynamic OpenGraph image (all code, no binaries to commit)
- **`Dockerfile`** — minimal multi-stage image from Next's standalone output
- **Route coverage** — every App Router pattern exercised at `/routes-demo`

From the talk **"NextDeploy — deploying full-stack apps, made easier"**
→ slides at [hersitech.com/talks/nextdeploy](https://hersitech.com/talks/nextdeploy)

**Live demo:** [yatba.org](https://yatba.org) · route coverage at [yatba.org/routes-demo](https://yatba.org/routes-demo)

## Quickstart (local)

```bash
# 1. grab it
git clone https://github.com/aynaash/nextdeploy-template
cd nextdeploy-template
bun install          # or: pnpm / npm install

# 2. configure
cp .env.example .env
#    DATABASE_URL       → from https://console.neon.tech (create a free project)
#    BETTER_AUTH_SECRET → openssl rand -base64 32

# 3. create the auth tables in Neon
bun run db:push

# 4. run
bun run dev          # → http://localhost:3000
```

Sign up at `/sign-up`, and you have working sessions backed by Postgres.

## Deploy to your own VPS

Edit `nextdeploy.yml` (your domain + VPS IP), then:

```bash
nextdeploy prepare                          # provision the VPS — once
nextdeploy secrets load .env.production     # DATABASE_URL, BETTER_AUTH_SECRET,
                                            # BETTER_AUTH_URL=https://your-domain.com
nextdeploy ship                             # build + deploy
```

Point the DNS record `ship` writes into `dns.md` (an `A` record to your VPS)
and Caddy provisions the Let's Encrypt cert automatically. A $5/mo box is
enough — 512 MB+ RAM, Ubuntu 20.04+.

Every deploy after that is just `nextdeploy ship` — zero-downtime (the new
release is health-checked before traffic flips to it), with instant rollbacks:

```bash
nextdeploy status              # active release, port, uptime, memory
nextdeploy logs                # tail the app
nextdeploy rollback --steps 1  # revert to the previous release
```

Secrets live on the VPS (mode 0600) and hot-reload the app when set — never
commit them.

## Run with Docker

The included `Dockerfile` builds a minimal image from Next's standalone output:

```bash
docker build -t nextdeploy-app .
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://…" \
  -e BETTER_AUTH_SECRET="…" \
  -e BETTER_AUTH_URL="https://your-domain.com" \
  nextdeploy-app
```

It ships with a `HEALTHCHECK` that hits `/api/health` (which pings Postgres).

## Project layout

```
src/
  proxy.ts                         # edge: auth redirect + security headers (Next.js 16)
  app/
    layout.tsx                     # root layout + metadata (OpenGraph, sitemap base)
    loading.tsx                    # root loading UI
    error.tsx                      # root error boundary
    not-found.tsx                  # 404 page
    robots.ts / sitemap.ts / manifest.ts / icon.tsx / opengraph-image.tsx
    api/
      auth/[...all]/route.ts       # better-auth handler (all auth endpoints)
      health/route.ts              # DB-checked readiness probe for deploys
      projects/route.ts            # GET list · POST create
      projects/[id]/route.ts       # GET · PATCH · DELETE by id
      deployments/route.ts         # GET list
      deployments/[id]/status/route.ts   # GET deployment status
    sign-in/ sign-up/              # email + password auth pages
    dashboard/
      layout.tsx                   # auth guard + top bar + tab nav
      page.tsx                     # overview — live stats from Postgres
      projects/                    # full CRUD (page + Server Actions + form)
      settings/                    # profile update via better-auth
      overview/                    # parallel routes demo
        layout.tsx                 # injects @analytics and @activity slots
        page.tsx
        @analytics/page.tsx
        @activity/page.tsx
    (marketing)/                   # route group — shared layout, URLs unaffected
      layout.tsx
      about/page.tsx               # → /about
      pricing/page.tsx             # → /pricing
    blog/[slug]/page.tsx           # dynamic route
    shop/[category]/[productId]/   # multiple dynamic segments
    projects/[id]/page.tsx         # dynamic + notFound()
    docs/[...slug]/page.tsx        # catch-all route
    deployments/
      page.tsx                     # feed — intercepting route entry point
      [id]/page.tsx                # full-page deployment detail
      (.)[id]/page.tsx             # intercepted modal (client-side nav from feed)
    routes-demo/page.tsx           # interactive index of all route patterns
  components/                      # flag-stripe, nav, auth form, skyline, …
  db/
    schema.ts                      # auth tables + app tables (project, deployment)
    index.ts                       # Drizzle + Neon client
  lib/
    env.ts                         # zod-validated environment
    auth.ts / auth-client.ts       # better-auth server + React client
    session.ts                     # getSession() / requireSession() helpers
    site.ts                        # public URL + site metadata
nextdeploy.yml                     # the deploy, in git
Dockerfile                         # standalone container image
```

## Route coverage

`/routes-demo` links to every route pattern in the app — useful as a smoke-test
index after a deploy to confirm all patterns resolve correctly.

| Pattern | Example URL |
|---|---|
| Static | `/`, `/sign-in` |
| Nested static | `/dashboard/projects`, `/dashboard/settings` |
| Dynamic segment | `/blog/[slug]`, `/projects/[id]` |
| Multiple dynamic segments | `/shop/[category]/[productId]` |
| Catch-all | `/docs/deploy/vps/caddy` |
| Optional catch-all | `/docs` |
| Route group | `/about`, `/pricing` (from `(marketing)`) |
| Parallel routes | `/dashboard/overview` (`@analytics` + `@activity`) |
| Intercepting route | `/deployments` → click row → modal |
| API static | `GET /api/health`, `GET /api/projects` |
| API dynamic | `GET /api/projects/[id]`, `GET /api/deployments/[id]/status` |

## License

MIT — take it, ship it.
