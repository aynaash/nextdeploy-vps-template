import type { Metadata } from "next";
import Link from "next/link";

import { FlagStripe, Shield } from "@/components/flag-stripe";

export const dynamic = "force-dynamic";

const navItems = [
  { slug: "vps/overview", title: "VPS Overview", group: "VPS" },
  { slug: "vps/go-sidecar", title: "Go Sidecar", group: "VPS" },
  { slug: "vps/daemon", title: "Daemon", group: "VPS" },
  { slug: "vps/atomic-cutover", title: "Zero-Downtime Cutover", group: "VPS" },
  {
    slug: "getting-started/vps-quickstart",
    title: "VPS Quickstart",
    group: "Getting Started",
  },
  {
    slug: "internals/go-sidecar",
    title: "Go Sidecar Internals",
    group: "Internals",
  },
];

type DocPage = {
  title: string;
  content: React.ReactNode;
};

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border-2 border-stone-900 bg-stone-900 p-5 font-mono text-sm leading-relaxed text-[#4ade80]">
      {children}
    </pre>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold text-stone-900">{title}</h2>
      {children}
    </div>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-base leading-relaxed text-stone-600">{children}</p>
  );
}

function Badge({ children, color = "stone" }: { children: React.ReactNode; color?: "green" | "red" | "gold" | "stone" }) {
  const styles: Record<string, string> = {
    green: "bg-[#006600]/10 text-[#006600]",
    red: "bg-[#BB0000]/10 text-[#BB0000]",
    gold: "bg-[#F5A623]/15 text-[#946200]",
    stone: "bg-stone-100 text-stone-600",
  };
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 font-mono text-xs font-medium ${styles[color]}`}>
      {children}
    </span>
  );
}

function getDocPage(slugParts: string[]): DocPage | null {
  const slug = slugParts.join("/");

  const pages: Record<string, DocPage> = {
    "vps/overview": {
      title: "VPS Overview",
      content: (
        <div className="flex flex-col gap-8">
          <Section title="What is NextDeploy VPS?">
            <Prose>
              NextDeploy VPS deploys your Next.js application directly onto a
              Linux server you own or rent. Unlike managed platforms that
              abstract the host away, you get a bare VPS, and NextDeploy
              configures and manages every layer of the stack.
            </Prose>
          </Section>

          <Section title="Stack layers">
            <Prose>
              Three processes run on the server: Caddy as the edge reverse
              proxy and automatic TLS manager, Node.js running your Next.js
              application, and optionally the Go Sidecar for ultra-fast
              prerendered page serving. The daemon process{" "}
              <code className="rounded bg-stone-200 px-1 py-0.5 font-mono text-sm">
                nextdeployd
              </code>{" "}
              supervises all of them.
            </Prose>
          </Section>

          <Section title="Architecture">
            <Code>{`┌─────────────────────────────────────────────────────┐
│                      Internet                       │
└─────────────────────────┬───────────────────────────┘
                          │ HTTPS :443
                          ▼
┌─────────────────────────────────────────────────────┐
│                  Caddy (edge proxy)                 │
│  • Automatic TLS (Let's Encrypt / ZeroSSL)          │
│  • HTTP/2 + HTTP/3                                  │
│  • Static asset serving                             │
└────────────┬───────────────────────────┬────────────┘
             │ /api/*, /_next/static/*   │ /*  (pages)
             │ pass-through              │
             ▼                           ▼
┌────────────────────┐     ┌─────────────────────────┐
│  Next.js (Node.js) │     │  Go Sidecar (optional)  │
│  :3000             │     │  :3001                  │
│  • Server actions  │◄────│  • In-memory page cache │
│  • API routes      │     │  • Image optimisation   │
│  • SSR / RSC       │     │  • Transparent fallback │
└────────────────────┘     └─────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────┐
│          Neon Postgres (serverless driver)           │
└─────────────────────────────────────────────────────┘`}</Code>
          </Section>

          <Section title="Key properties">
            <ul className="flex flex-col gap-2 text-sm text-stone-600">
              {[
                "Zero vendor lock-in — your server, your data",
                "Atomic deploys: new release built in parallel, traffic flipped only after /api/health passes",
                "Automatic rollback if the health check fails within 30 seconds of cutover",
                "Single YAML file (nextdeploy.yml) controls the entire deployment",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#006600]" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>
        </div>
      ),
    },

    "vps/go-sidecar": {
      title: "Go Sidecar",
      content: (
        <div className="flex flex-col gap-8">
          <Section title="What is the Go Sidecar?">
            <Prose>
              The Go Sidecar is an optional high-performance reverse proxy
              written in Go that sits between Caddy and your Next.js process.
              It serves prerendered HTML pages directly from memory, handling
              repeated requests in under a millisecond without touching Node.js.
            </Prose>
          </Section>

          <Section title="Request flow">
            <Code>{`Browser
  │
  ▼  HTTPS
Caddy (:443)
  │
  ├─ Static assets (/_next/static/*)  ──► served by Caddy directly
  │
  └─ Page requests  ──────────────────► Go Sidecar (:3001)
                                             │
                                    ┌────────┴─────────┐
                                    │  cache hit?       │
                                    │  < 0.5 ms        │
                                    └────────┬─────────┘
                                        no   │  yes
                                        │    └──► return cached HTML
                                        ▼
                                   Next.js (:3000)
                                        │
                                   renders page
                                        │
                                   sidecar caches
                                   response + returns`}</Code>
          </Section>

          <Section title="Capabilities">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  title: "In-memory page cache",
                  desc: "Radix-tree keyed cache stores full HTML responses. Invalidated on deploy.",
                  badge: "green" as const,
                },
                {
                  title: "Image optimisation",
                  desc: "Resizes and converts images to WebP/AVIF on first request, caches the result.",
                  badge: "green" as const,
                },
                {
                  title: "Transparent fallback",
                  desc: "Cache miss or sidecar crash: Caddy falls back to Next.js directly. Zero downtime.",
                  badge: "gold" as const,
                },
                {
                  title: "Worker pool",
                  desc: "Configurable goroutine pool prevents thundering-herd on cache population.",
                  badge: "stone" as const,
                },
              ].map((cap) => (
                <div
                  key={cap.title}
                  className="rounded-xl border border-stone-200 bg-white p-4"
                >
                  <div className="flex items-center gap-2">
                    <Badge color={cap.badge}>{cap.title}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-stone-600">{cap.desc}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Configuration (nextdeploy.yml)">
            <Code>{`# nextdeploy.yml
name: my-app
region: nairobi-1

gosidecar:
  enabled: true
  port: 3001
  max_image_workers: 4
  cache:
    max_entries: 2000
    ttl: 3600            # seconds; 0 = cache until next deploy
    exclude:
      - /api/*
      - /dashboard/*     # never cache authenticated pages
  image_optimization:
    enabled: true
    formats: [webp, avif]
    quality: 85`}</Code>
          </Section>

          <Section title="Deploy commands">
            <div className="flex flex-col gap-3">
              <Prose>
                The sidecar binary is bundled with the NextDeploy CLI and
                uploaded during{" "}
                <code className="rounded bg-stone-200 px-1 py-0.5 font-mono text-sm">
                  nextdeploy prepare
                </code>
                . No separate installation needed.
              </Prose>
              <Code>{`# Validate config and upload the sidecar binary to your VPS
nextdeploy prepare

# Build your app, transfer the bundle, run health check, flip traffic
nextdeploy ship

# Verify sidecar is running and check cache stats
nextdeploy sidecar status

# Flush the page cache without redeploying
nextdeploy sidecar purge`}</Code>
            </div>
          </Section>
        </div>
      ),
    },

    "vps/daemon": {
      title: "Daemon",
      content: (
        <div className="flex flex-col gap-8">
          <Section title="What is nextdeployd?">
            <Prose>
              {`nextdeployd`} is the lightweight supervisor process that runs
              permanently on your VPS. It manages the lifecycle of Caddy,
              Node.js, and the optional Go Sidecar — restarting them on crash,
              collecting logs, and executing atomic cutovers when you ship a new
              release.
            </Prose>
          </Section>

          <Section title="Process tree">
            <Code>{`nextdeployd (PID 1 or systemd unit)
├── caddy             (edge proxy + TLS)
├── node server.js    (Next.js app — current release)
│   └── [workers]
└── go-sidecar        (optional — enabled in nextdeploy.yml)`}</Code>
          </Section>

          <Section title="Common commands">
            <div className="flex flex-col gap-4">
              <div>
                <p className="mb-2 font-mono text-sm font-semibold text-stone-700">
                  Status
                </p>
                <Code>{`$ nextdeploy status

  Service        Status    PID     Uptime
  ─────────────────────────────────────────
  caddy          running   1842    3d 14h
  node           running   1901    3d 14h
  go-sidecar     running   1923    3d 14h

  Current release: v23  (commit a1b2c3d)
  Previous release: v22  (commit f9e8d7c) — kept for rollback`}</Code>
              </div>
              <div>
                <p className="mb-2 font-mono text-sm font-semibold text-stone-700">
                  Logs
                </p>
                <Code>{`# Stream all logs
nextdeploy logs

# Filter by service
nextdeploy logs --service node
nextdeploy logs --service go-sidecar

# Last 100 lines
nextdeploy logs --tail 100`}</Code>
              </div>
              <div>
                <p className="mb-2 font-mono text-sm font-semibold text-stone-700">
                  Rollback
                </p>
                <Code>{`# Roll back to the previous release instantly
nextdeploy rollback

# Roll back to a specific release by id
nextdeploy rollback --release v21`}</Code>
              </div>
            </div>
          </Section>

          <Section title="Crash recovery">
            <Prose>
              {`nextdeployd`} uses an exponential back-off restart strategy. If a
              process crashes more than 5 times in 60 seconds, the daemon marks
              it as{" "}
              <Badge color="red">unhealthy</Badge> and sends an alert via the
              configured webhook. The previous release is left running during
              this window.
            </Prose>
          </Section>
        </div>
      ),
    },

    "vps/atomic-cutover": {
      title: "Zero-Downtime Cutover",
      content: (
        <div className="flex flex-col gap-8">
          <Section title="The strategy">
            <Prose>
              Every{" "}
              <code className="rounded bg-stone-200 px-1 py-0.5 font-mono text-sm">
                nextdeploy ship
              </code>{" "}
              follows a health-check-then-flip pattern. The new release is built
              and started on a shadow port. Only after the health endpoint
              returns 200 does Caddy flip traffic. The old process keeps running
              until confirmed healthy — if the check fails, the flip never
              happens.
            </Prose>
          </Section>

          <Section title="Cutover sequence">
            <Code>{`1. Upload new bundle to VPS
2. Extract to /releases/v{n} (parallel to current /releases/v{n-1})
3. Start new Node.js process on :3002 (shadow port)
4. Poll GET /api/health on :3002 (max 30s, 1s interval)
   • returns { status: "ok", database: "ok" } ──► proceed
   • returns non-200 or timeout         ──► abort, cleanup :3002
5. Atomically update Caddy upstream:  :3000 ──► :3002
6. Drain :3000 (60s graceful shutdown)
7. Rename /releases/current symlink to v{n}
8. Keep v{n-1} for one-command rollback`}</Code>
          </Section>

          <Section title="Health probe">
            <Prose>
              The{" "}
              <code className="rounded bg-stone-200 px-1 py-0.5 font-mono text-sm">
                GET /api/health
              </code>{" "}
              route in this template performs a real database liveness check
              (
              <code className="rounded bg-stone-200 px-1 py-0.5 font-mono text-sm">
                SELECT 1
              </code>
              ) so the probe catches both application start failures and broken
              DB connections before any traffic hits the new release.
            </Prose>
            <Code>{`// src/app/api/health/route.ts
export async function GET() {
  await db.execute(sql\`select 1\`);           // real DB check
  return Response.json({ status: "ok" });   // 200 ──► flip traffic
}`}</Code>
          </Section>

          <Section title="Rollback">
            <Prose>
              Because the previous release directory and process are kept for 24
              hours, rolling back is a single command that completes in under 2
              seconds — faster than a fresh deploy.
            </Prose>
            <Code>{`nextdeploy rollback  # re-runs step 5 in reverse`}</Code>
          </Section>
        </div>
      ),
    },

    "getting-started/vps-quickstart": {
      title: "VPS Quickstart",
      content: (
        <div className="flex flex-col gap-8">
          <Section title="Before you start">
            <Prose>
              You need: a Linux VPS (Ubuntu 22.04+ recommended), SSH access as
              root or a sudo user, a domain pointed at the server IP, and the
              NextDeploy CLI installed locally.
            </Prose>
            <Code>{`npm install -g @nextdeploy/cli
nextdeploy --version  # should print 1.x.x`}</Code>
          </Section>

          <Section title="Step 1 — Provision the server">
            <Prose>
              Run the provisioner from your local machine. It SSHes into the
              server, installs Caddy, Node.js LTS, and the{" "}
              <code className="rounded bg-stone-200 px-1 py-0.5 font-mono text-sm">
                nextdeployd
              </code>{" "}
              daemon.
            </Prose>
            <Code>{`nextdeploy provision ssh://root@203.0.113.42

# Output:
# ✓ Connected to 203.0.113.42
# ✓ Installed Caddy 2.8.4
# ✓ Installed Node.js 22.3.0
# ✓ Installed nextdeployd 1.2.0
# ✓ Opened ports 80, 443
# Server ready. Add your secrets and run nextdeploy ship.`}</Code>
          </Section>

          <Section title="Step 2 — Add secrets">
            <Prose>
              Secrets are encrypted at rest on the server and injected as
              environment variables at runtime.
            </Prose>
            <Code>{`nextdeploy secrets set DATABASE_URL="postgresql://..."
nextdeploy secrets set BETTER_AUTH_SECRET="..."
nextdeploy secrets set BETTER_AUTH_URL="https://yourdomain.com"`}</Code>
          </Section>

          <Section title="Step 3 — Ship">
            <Code>{`nextdeploy ship

# Output:
# ✓ Building Next.js app...
# ✓ Bundle size: 4.2 MB
# ✓ Uploaded to server
# ✓ Started new release on :3002
# ✓ Health check passed (latency: 12ms)
# ✓ Traffic flipped: :3000 → :3002
# ✓ Deployed v1 (commit a1b2c3d)
#   https://yourdomain.com`}</Code>
          </Section>

          <Section title="Step 4 — Configure DNS">
            <Prose>
              Point your domain&apos;s A record at the server IP. Caddy fetches a
              TLS certificate automatically on the first HTTPS request.
            </Prose>
            <Code>{`# DNS A record
yourdomain.com.    300  IN  A  203.0.113.42
www.yourdomain.com 300  IN  A  203.0.113.42`}</Code>
          </Section>

          <Section title="Step 5 — Enable the Go Sidecar (optional)">
            <Prose>
              Add the{" "}
              <code className="rounded bg-stone-200 px-1 py-0.5 font-mono text-sm">
                gosidecar
              </code>{" "}
              block to your{" "}
              <code className="rounded bg-stone-200 px-1 py-0.5 font-mono text-sm">
                nextdeploy.yml
              </code>{" "}
              and re-ship. See the{" "}
              <Link
                href="/docs/vps/go-sidecar"
                className="font-medium text-[#006600] underline-offset-2 hover:underline"
              >
                Go Sidecar docs
              </Link>{" "}
              for the full config reference.
            </Prose>
          </Section>
        </div>
      ),
    },

    "internals/go-sidecar": {
      title: "Go Sidecar Internals",
      content: (
        <div className="flex flex-col gap-8">
          <Section title="Overview">
            <Prose>
              The Go Sidecar is a ~3,000-line Go binary with no external
              runtime dependencies. It binds on the port configured in
              nextdeploy.yml and proxies requests to Next.js, caching full
              HTTP responses in memory.
            </Prose>
          </Section>

          <Section title="Radix tree indexing">
            <Prose>
              Cache keys are stored in a compressed radix (Patricia) tree keyed
              on the request path plus a normalised query string. Lookup is
              O(k) where k is the path length — typically under 50 ns on
              modern hardware regardless of cache size.
            </Prose>
            <Code>{`// Simplified cache key structure
type CacheKey struct {
    Path        string   // e.g. "/blog/hello-nextdeploy"
    QueryHash   uint64   // FNV-1a hash of sorted query params
    AcceptEnc   string   // "br" | "gzip" | ""
}

// Radix tree node
type node struct {
    prefix   string
    children []*node
    entry    *cacheEntry   // nil for internal nodes
}`}</Code>
          </Section>

          <Section title="Worker pool">
            <Prose>
              Cache population (fetching from Next.js and storing the response)
              runs in a fixed goroutine pool. If all workers are busy — a
              thundering-herd scenario after a cold start or purge — subsequent
              requests for the same key coalesce via a singleflight group: only
              one goroutine fetches, and all waiters receive the same response.
            </Prose>
            <Code>{`var group singleflight.Group

func (c *Cache) populate(key string, fetch func() (*Response, error)) (*Response, error) {
    res, err, _ := group.Do(key, func() (interface{}, error) {
        return fetch()
    })
    return res.(*Response), err
}`}</Code>
          </Section>

          <Section title="Keep-alive proxy">
            <Prose>
              The sidecar maintains a persistent HTTP/1.1 keep-alive connection
              pool to the Next.js upstream. Connection reuse eliminates the TCP
              and TLS handshake cost on cache misses, keeping proxy overhead
              under 200 µs even on a loopback connection.
            </Prose>
            <Code>{`transport := &http.Transport{
    MaxIdleConnsPerHost: cfg.MaxImageWorkers * 2,
    IdleConnTimeout:     90 * time.Second,
    DisableCompression:  true,  // sidecar manages its own compression
}`}</Code>
          </Section>

          <Section title="Cache invalidation">
            <Prose>
              On each{" "}
              <code className="rounded bg-stone-200 px-1 py-0.5 font-mono text-sm">
                nextdeploy ship
              </code>
              , the daemon sends a{" "}
              <code className="rounded bg-stone-200 px-1 py-0.5 font-mono text-sm">
                POST /internal/purge
              </code>{" "}
              request to the sidecar over the loopback interface before the
              Caddy cutover. This guarantees no stale HTML is served after a
              deploy. The endpoint is firewalled and only reachable from
              localhost.
            </Prose>
          </Section>
        </div>
      ),
    },
  };

  return pages[slug] ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getDocPage(slug);
  return { title: page ? `${page.title} — Docs` : "Docs" };
}

export default async function DocsSlugPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugStr = slug.join("/");
  const page = getDocPage(slug);

  const currentIndex = navItems.findIndex((n) => n.slug === slugStr);
  const prev = currentIndex > 0 ? navItems[currentIndex - 1] : null;
  const next =
    currentIndex < navItems.length - 1 ? navItems[currentIndex + 1] : null;

  // Group nav items
  const groups = navItems.reduce<Record<string, typeof navItems>>(
    (acc, item) => {
      const g = item.group;
      if (!acc[g]) acc[g] = [];
      acc[g].push(item);
      return acc;
    },
    {},
  );

  return (
    <div className="min-h-screen bg-[#faf8f3] text-stone-900">
      <FlagStripe />

      <header className="border-b-2 border-stone-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Shield className="h-8 w-7" />
            <span className="font-mono text-sm font-bold uppercase tracking-[0.2em]">
              NextDeploy
            </span>
            <span className="text-xs">🇰🇪</span>
          </Link>
          <nav className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.15em] text-stone-500">
            <Link href="/docs" className="transition hover:text-stone-900">
              Docs
            </Link>
            <Link
              href="/routes-demo"
              className="hidden transition hover:text-stone-900 sm:block"
            >
              ← routes demo
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="flex gap-10 py-10">
          {/* Sidebar */}
          <aside className="hidden w-56 shrink-0 lg:block">
            <nav className="sticky top-24 flex flex-col gap-6">
              {Object.entries(groups).map(([group, items]) => (
                <div key={group}>
                  <p className="mb-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-stone-400">
                    {group}
                  </p>
                  <ul className="flex flex-col gap-0.5">
                    {items.map((item) => {
                      const active = item.slug === slugStr;
                      return (
                        <li key={item.slug}>
                          <Link
                            href={`/docs/${item.slug}`}
                            className={`block rounded-lg px-3 py-2 text-sm transition ${
                              active
                                ? "bg-stone-900 font-medium text-[#faf8f3]"
                                : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                            }`}
                          >
                            {item.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <main className="min-w-0 flex-1">
            {page ? (
              <>
                <div className="mb-8 border-b-2 border-stone-900 pb-6">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-stone-400">
                    /docs/{slugStr}
                  </p>
                  <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 lg:text-4xl">
                    {page.title}
                  </h1>
                </div>

                {page.content}

                {/* Prev/Next navigation */}
                <div className="mt-12 flex items-center justify-between gap-4 border-t-2 border-stone-900 pt-6">
                  {prev ? (
                    <Link
                      href={`/docs/${prev.slug}`}
                      className="group flex flex-col gap-0.5 rounded-xl border-2 border-stone-900 bg-white px-5 py-4 transition hover:bg-stone-900 hover:text-[#faf8f3]"
                    >
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-stone-400 group-hover:text-stone-500">
                        ← previous
                      </span>
                      <span className="text-sm font-medium group-hover:text-[#4ade80]">
                        {prev.title}
                      </span>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {next ? (
                    <Link
                      href={`/docs/${next.slug}`}
                      className="group flex flex-col items-end gap-0.5 rounded-xl border-2 border-stone-900 bg-white px-5 py-4 transition hover:bg-stone-900 hover:text-[#faf8f3]"
                    >
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-stone-400 group-hover:text-stone-500">
                        next →
                      </span>
                      <span className="text-sm font-medium group-hover:text-[#4ade80]">
                        {next.title}
                      </span>
                    </Link>
                  ) : (
                    <div />
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-4">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-stone-400">
                  /docs/{slugStr}
                </p>
                <h1 className="text-3xl font-bold tracking-tight text-stone-900">
                  Page not found in docs
                </h1>
                <p className="text-stone-500">
                  This documentation page doesn&apos;t exist yet. Check the
                  sidebar for available pages.
                </p>
                <Link
                  href="/docs"
                  className="inline-flex w-fit items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-stone-800"
                >
                  ← Back to Docs
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
