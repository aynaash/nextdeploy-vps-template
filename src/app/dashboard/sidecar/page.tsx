import type { Metadata } from "next";

import { PurgeCacheForm, ToggleForm, WorkerConfigForm } from "./sidecar-controls";

export const metadata: Metadata = { title: "Go Sidecar" };

const stats = [
  { label: "Cache hits", value: "1,842", sub: "+23 this hour", color: "text-[#006600]" },
  { label: "Images served", value: "94", sub: "WebP / AVIF", color: "text-stone-900" },
  { label: "Avg latency", value: "0.4 ms", sub: "p99: 1.2 ms", color: "text-stone-900" },
];

const configYaml = `gosidecar:
  enabled: true
  port: 3001
  max_image_workers: 4
  cache:
    max_entries: 2000
    ttl: 3600
    exclude:
      - /api/*
      - /dashboard/*
  image_optimization:
    enabled: true
    formats: [webp, avif]
    quality: 85`;

export default function SidecarPage() {
  // Static demo values — in production read from DB / sidecar API
  const enabled = true;
  const version = "1.2.0";
  const maxImageWorkers = 4;

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-stone-900">
            Go Sidecar
          </h1>
          <p className="text-sm text-stone-500">
            High-performance reverse proxy for sub-millisecond page serving and
            image optimisation.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
              enabled
                ? "bg-[#006600]/10 text-[#006600]"
                : "bg-stone-100 text-stone-500"
            }`}
          >
            {enabled && (
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#006600]" />
            )}
            {enabled ? "enabled" : "disabled"}
          </span>
          <span className="font-mono text-xs text-stone-400">v{version}</span>
        </div>
      </div>

      {/* Stat cards */}
      <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-stone-200 bg-stone-200 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-white px-6 py-6">
            <dt className="text-xs font-medium uppercase tracking-wider text-stone-400">
              {s.label}
            </dt>
            <dd className={`mt-1.5 text-2xl font-semibold ${s.color}`}>
              {s.value}
            </dd>
            <dd className="mt-0.5 text-xs text-stone-400">{s.sub}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Request flow */}
        <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 font-semibold text-stone-900">Request flow</h2>
          <div className="flex flex-col items-center gap-1 font-mono text-sm">
            {[
              {
                label: "Caddy",
                note: "edge proxy · :443",
                bg: "bg-stone-900",
                text: "text-[#faf8f3]",
              },
              null,
              {
                label: "Go Sidecar",
                note: ":3001 · cache",
                bg: "bg-[#006600]",
                text: "text-white",
              },
              null,
              {
                label: "Next.js",
                note: ":3000 · SSR",
                bg: "bg-[#BB0000]",
                text: "text-white",
              },
            ].map((item, i) =>
              item === null ? (
                <div
                  key={`arrow-${i}`}
                  className="flex flex-col items-center gap-0"
                >
                  <span className="h-5 w-px bg-stone-300" />
                  <span className="text-xs text-stone-400">↓</span>
                  <span className="h-5 w-px bg-stone-300" />
                </div>
              ) : (
                <div
                  key={item.label}
                  className={`flex w-full max-w-xs flex-col items-center rounded-lg px-4 py-3 ${item.bg}`}
                >
                  <span className={`font-semibold ${item.text}`}>
                    {item.label}
                  </span>
                  <span
                    className={`text-[0.65rem] uppercase tracking-[0.1em] ${item.text} opacity-70`}
                  >
                    {item.note}
                  </span>
                </div>
              ),
            )}
          </div>
          <p className="mt-5 text-xs text-stone-400">
            Cache hit: &lt;0.5 ms · Cache miss: proxied to Next.js ·
            Transparent fallback if sidecar is down
          </p>
        </section>

        {/* Controls */}
        <div className="flex flex-col gap-4">
          <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-semibold text-stone-900">Controls</h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-4 rounded-lg border border-stone-100 p-4">
                <div>
                  <p className="text-sm font-medium text-stone-800">
                    Sidecar process
                  </p>
                  <p className="text-xs text-stone-500">
                    Toggle the sidecar on or off
                  </p>
                </div>
                <ToggleForm enabled={enabled} />
              </div>

              <div className="flex items-center justify-between gap-4 rounded-lg border border-stone-100 p-4">
                <div>
                  <p className="text-sm font-medium text-stone-800">
                    Page cache
                  </p>
                  <p className="text-xs text-stone-500">
                    Flush all cached responses
                  </p>
                </div>
                <PurgeCacheForm />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-semibold text-stone-900">
              Worker configuration
            </h2>
            <WorkerConfigForm current={maxImageWorkers} />
          </section>
        </div>
      </div>

      {/* Config block */}
      <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-semibold text-stone-900">
          nextdeploy.yml — gosidecar block
        </h2>
        <pre className="overflow-x-auto rounded-xl border-2 border-stone-900 bg-stone-900 p-5 font-mono text-sm leading-relaxed text-[#4ade80]">
          {configYaml}
        </pre>
        <p className="mt-3 text-xs text-stone-400">
          Edit this file and run{" "}
          <code className="rounded bg-stone-100 px-1 py-0.5 font-mono">
            nextdeploy ship
          </code>{" "}
          to apply changes.
        </p>
      </section>
    </main>
  );
}
