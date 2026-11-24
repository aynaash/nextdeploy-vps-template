import type { Metadata } from "next";
import Link from "next/link";

import { FlagStripe, Shield } from "@/components/flag-stripe";

const routes = [
  {
    section: "Static",
    color: "bg-stone-900",
    items: [
      { label: "Home", path: "/", note: "app/page.tsx" },
      { label: "Routes demo", path: "/routes-demo", note: "app/routes-demo/page.tsx" },
      { label: "Sign in", path: "/sign-in", note: "app/sign-in/page.tsx" },
    ],
  },
  {
    section: "Nested",
    color: "bg-stone-900",
    items: [
      { label: "Dashboard", path: "/dashboard", note: "app/dashboard/page.tsx" },
      { label: "Dashboard · Projects", path: "/dashboard/projects", note: "app/dashboard/projects/page.tsx" },
      { label: "Dashboard · Settings", path: "/dashboard/settings", note: "app/dashboard/settings/page.tsx" },
    ],
  },
  {
    section: "Dynamic",
    color: "bg-[#006600]",
    items: [
      { label: "/blog/[slug]", path: "/blog/hello-nextdeploy", note: "app/blog/[slug]/page.tsx" },
      { label: "/shop/[category]/[productId]", path: "/shop/vps/starter-pack", note: "app/shop/[category]/[productId]/page.tsx" },
      { label: "/projects/[id]", path: "/projects/demo-project", note: "app/projects/[id]/page.tsx" },
    ],
  },
  {
    section: "Catch-all",
    color: "bg-[#006600]",
    items: [
      { label: "/docs/[...slug] — one segment", path: "/docs/deploy", note: "app/docs/[...slug]/page.tsx" },
      { label: "/docs/[...slug] — deep path", path: "/docs/deploy/vps/caddy", note: "slug = ['deploy','vps','caddy']" },
      { label: "/docs/[[...slug]] — optional root", path: "/docs", note: "app/docs/[[...slug]]/page.tsx · slug = undefined" },
    ],
  },
  {
    section: "Route group",
    color: "bg-[#BB0000]",
    items: [
      { label: "/about — from (marketing)", path: "/about", note: "app/(marketing)/about/page.tsx" },
      { label: "/pricing — from (marketing)", path: "/pricing", note: "app/(marketing)/pricing/page.tsx" },
    ],
  },
  {
    section: "Parallel routes",
    color: "bg-[#BB0000]",
    items: [
      { label: "/dashboard/overview — @analytics + @activity slots", path: "/dashboard/overview", note: "layout.tsx + @analytics + @activity" },
    ],
  },
  {
    section: "Intercepting routes",
    color: "bg-[#F5A623]",
    items: [
      { label: "/deployments — feed (click a row to intercept)", path: "/deployments", note: "app/deployments/page.tsx" },
      { label: "/deployments/[id] — full page (direct URL)", path: "/deployments/deploy-123", note: "app/deployments/[id]/page.tsx · app/deployments/(.)[id]/page.tsx for modal" },
    ],
  },
  {
    section: "API routes",
    color: "bg-stone-600",
    items: [
      { label: "GET /api/health", path: "/api/health", note: "DB liveness · polled by nextdeploy ship" },
      { label: "GET /api/projects", path: "/api/projects", note: "app/api/projects/route.ts" },
      { label: "GET /api/projects/[id]", path: "/api/projects/demo-project", note: "app/api/projects/[id]/route.ts" },
      { label: "GET /api/deployments", path: "/api/deployments", note: "app/api/deployments/route.ts" },
      { label: "GET /api/deployments/[id]/status", path: "/api/deployments/deploy-123/status", note: "app/api/deployments/[id]/status/route.ts" },
    ],
  },
  {
    section: "Special UI files",
    color: "bg-stone-400",
    items: [
      { label: "404 — not-found.tsx", path: "/this-page-does-not-exist", note: "trigger notFound()" },
    ],
  },
  {
    section: "Docs pages",
    color: "bg-stone-900",
    items: [
      { label: "/docs — static root", path: "/docs", note: "app/docs/page.tsx" },
      { label: "/docs/vps/overview", path: "/docs/vps/overview", note: "app/docs/[...slug]/page.tsx" },
      { label: "/docs/vps/go-sidecar", path: "/docs/vps/go-sidecar", note: "app/docs/[...slug]/page.tsx" },
      { label: "/docs/internals/go-sidecar", path: "/docs/internals/go-sidecar", note: "app/docs/[...slug]/page.tsx" },
    ],
  },
  {
    section: "Dashboard — new pages",
    color: "bg-[#006600]",
    items: [
      { label: "/dashboard/sidecar", path: "/dashboard/sidecar", note: "app/dashboard/sidecar/page.tsx" },
      { label: "/dashboard/logs", path: "/dashboard/logs", note: "app/dashboard/logs/page.tsx" },
      { label: "/dashboard/releases", path: "/dashboard/releases", note: "app/dashboard/releases/page.tsx" },
    ],
  },
  {
    section: "New API routes",
    color: "bg-stone-600",
    items: [
      { label: "GET /api/sidecar/status", path: "/api/sidecar/status", note: "app/api/sidecar/status/route.ts" },
      { label: "GET /api/sidecar/cache", path: "/api/sidecar/cache", note: "app/api/sidecar/cache/route.ts" },
      { label: "GET /api/logs", path: "/api/logs", note: "app/api/logs/route.ts" },
      { label: "GET /api/logs/[id]", path: "/api/logs/5", note: "app/api/logs/[id]/route.ts" },
      { label: "GET /api/releases", path: "/api/releases", note: "app/api/releases/route.ts" },
      { label: "GET /api/releases/[id]", path: "/api/releases/rel-24", note: "app/api/releases/[id]/route.ts" },
      { label: "POST /api/releases/[id]/rollback", path: "/api/releases/rel-23/rollback", note: "app/api/releases/[id]/rollback/route.ts" },
    ],
  },
];

export const metadata: Metadata = {
  title: "Routes Demo",
};

export default function RoutesDemoPage() {
  const totalRoutes = routes.reduce((sum, s) => sum + s.items.length, 0);

  return (
    <div className="min-h-screen bg-[#faf8f3] text-stone-900">
      <FlagStripe />

      {/* Nav */}
      <header className="border-b-2 border-stone-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Shield className="h-8 w-7" />
            <span className="font-mono text-sm font-bold uppercase tracking-[0.2em]">NextDeploy</span>
            <span className="text-xs">🇰🇪</span>
          </Link>
          <nav className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.15em] text-stone-500">
            <Link href="/" className="hidden transition hover:text-stone-900 sm:block">← Home</Link>
            <span className="border border-stone-300 px-3 py-1.5 text-stone-600">
              {totalRoutes} routes
            </span>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b-2 border-stone-900">
        <div className="mx-auto grid max-w-6xl lg:grid-cols-12">
          {/* Left */}
          <div className="border-stone-900 px-5 py-12 lg:col-span-7 lg:border-r-2 lg:py-16 lg:pl-8 lg:pr-12">
            <div className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-stone-500">
              <span className="bg-stone-900 px-2 py-1 text-[#faf8f3]">Route coverage</span>
              <span className="ml-3">Next.js 15 · App Router</span>
            </div>

            <h1 className="mt-7 text-[2.4rem] font-bold leading-[0.95] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              Every route
              <br />
              pattern.
              <br />
              <span className="box-decoration-clone bg-[#006600] px-2 text-[#faf8f3]">
                All verified.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-stone-600">
              Static, dynamic, catch-all, route groups, parallel, intercepting, and API routes —
              all wired in this project so the deployment tool can confirm every pattern resolves
              correctly after a ship.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.15em]">
              {routes.map((s) => (
                <span
                  key={s.section}
                  className="border border-stone-300 bg-white px-3 py-1.5 text-stone-500"
                >
                  {s.section}
                </span>
              ))}
            </div>
          </div>

          {/* Right — stat panel */}
          <div className="flex flex-col justify-between bg-stone-900 px-5 py-12 text-[#faf8f3] lg:col-span-5 lg:p-8">
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-stone-500">
                {"// coverage"}
              </p>
              <dl className="mt-6 divide-y divide-white/10 font-mono text-sm">
                {[
                  { k: "Static / nested", v: "3 + 3" },
                  { k: "Dynamic segments", v: "3" },
                  { k: "Catch-all", v: "3 (incl. optional)" },
                  { k: "Route groups", v: "2" },
                  { k: "Parallel routes", v: "2 slots" },
                  { k: "Intercepting", v: "1 modal" },
                  { k: "API routes", v: "5" },
                  { k: "Special UI", v: "not-found · error" },
                ].map((row) => (
                  <div key={row.k} className="flex items-center justify-between py-3">
                    <dt className="uppercase tracking-widest text-stone-500">{row.k}</dt>
                    <dd className="text-right">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="mt-10 border-t border-white/10 pt-6">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-stone-500">
                total routes
              </p>
              <p className="mt-1 font-mono text-5xl font-bold">{totalRoutes}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Route grid */}
      <main className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
        <div className="flex flex-col gap-10">
          {routes.map((section) => (
            <section key={section.section}>
              {/* Section header */}
              <div className="mb-4 flex items-center gap-3">
                <span className={`h-3 w-3 ${section.color}`} />
                <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-stone-500">
                  {section.section}
                </h2>
              </div>

              {/* Route cards */}
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className="group flex h-full flex-col justify-between gap-4 rounded-xl border-2 border-stone-900 bg-white p-5 transition hover:bg-stone-900 hover:text-[#faf8f3]"
                    >
                      <div className="flex flex-col gap-1.5">
                        <span className="font-mono text-sm font-semibold leading-snug group-hover:text-[#4ade80]">
                          {item.path}
                        </span>
                        <span className="text-sm text-stone-600 group-hover:text-stone-300">
                          {item.label}
                        </span>
                      </div>
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-stone-400 group-hover:text-stone-500">
                        {item.note}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-stone-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-8 lg:px-8">
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-stone-500">
            <Shield className="h-5 w-4" />
            NextDeploy · Nairobi 🇰🇪
          </span>
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-[0.15em] text-stone-400 underline-offset-4 transition hover:text-stone-900 hover:underline"
          >
            ← back home
          </Link>
        </div>
      </footer>
    </div>
  );
}
