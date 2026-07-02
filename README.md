# NextDeploy Template

A full-stack **Next.js** starter — auth and Postgres included — that deploys to
a VPS **you own** with one command.

- **Next.js 15** (App Router, Server Components, TypeScript strict)
- **[better-auth](https://better-auth.com)** — email + password, sessions in Postgres
- **[Neon](https://neon.tech)** — serverless Postgres (free tier is plenty)
- **[Drizzle ORM](https://orm.drizzle.team)** — typed schema, `db:push` migrations
- **Tailwind CSS v4**
- **[`nextdeploy.yml`](./nextdeploy.yml)** — the whole deploy, one committed file

From the talk **“NextDeploy — deploying full-stack apps, made easier”**
→ slides at [hersitech.com/talks/nextdeploy](https://hersitech.com/talks/nextdeploy)

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

Sign up at `/sign-in`, and you have working sessions backed by Postgres.

## Deploy to your own VPS

```bash
# edit nextdeploy.yml: your domain + your VPS IP
nextdeploy up
```

That's it — build, ship, process supervision, domain, and **automatic HTTPS**
(Caddy). A $5/mo box is enough.

Set the production env vars (`DATABASE_URL`, `BETTER_AUTH_SECRET`,
`BETTER_AUTH_URL=https://your-domain.com`) on the server — never commit them.

## Project layout

```
src/
  app/
    api/auth/[...all]/route.ts   # better-auth handler (all auth endpoints)
    sign-in/page.tsx             # email+password sign in / sign up
    page.tsx                     # reads the session server-side
  components/sign-out-button.tsx
  db/
    schema.ts                    # better-auth tables (user, session, account, verification)
    index.ts                     # Drizzle + Neon client
  lib/
    auth.ts                      # better-auth server config
    auth-client.ts               # better-auth React client
nextdeploy.yml                   # the deploy, in git
```

## License

MIT — take it, ship it.
