import type { Metadata } from "next";
import Link from "next/link";

import { FlagStripe, Shield } from "@/components/flag-stripe";

export const metadata: Metadata = { title: "Docs" };

const docSections = [
  {
    slug: "vps/overview",
    title: "VPS Overview",
    desc: "How NextDeploy deploys to your own server.",
    color: "bg-[#006600]",
  },
  {
    slug: "vps/go-sidecar",
    title: "Go Sidecar",
    desc: "Sub-ms prerendered serving + image optimization.",
    color: "bg-[#006600]",
  },
  {
    slug: "vps/daemon",
    title: "Daemon",
    desc: "The nextdeployd process manager on your VPS.",
    color: "bg-stone-900",
  },
  {
    slug: "vps/atomic-cutover",
    title: "Zero-Downtime Cutover",
    desc: "How traffic flips with zero downtime.",
    color: "bg-stone-900",
  },
  {
    slug: "getting-started/vps-quickstart",
    title: "VPS Quickstart",
    desc: "From zero to deployed in minutes.",
    color: "bg-[#BB0000]",
  },
  {
    slug: "internals/go-sidecar",
    title: "Go Sidecar Internals",
    desc: "Architecture deep-dive.",
    color: "bg-[#F5A623]",
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#faf8f3] text-stone-900">
      <FlagStripe />

      <header className="border-b-2 border-stone-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Shield className="h-8 w-7" />
            <span className="font-mono text-sm font-bold uppercase tracking-[0.2em]">
              NextDeploy
            </span>
            <span className="text-xs">🇰🇪</span>
          </Link>
          <nav className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.15em] text-stone-500">
            <Link
              href="/routes-demo"
              className="transition hover:text-stone-900"
            >
              ← routes demo
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-12 lg:px-8">
        <div className="mb-10">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-stone-500">
            <span className="bg-stone-900 px-2 py-1 text-[#faf8f3]">
              Documentation
            </span>
            <span className="ml-3">NextDeploy VPS</span>
          </p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-stone-900 lg:text-5xl">
            Docs
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-stone-600">
            Everything you need to deploy, manage, and optimise a Next.js app on
            your own VPS — including the optional Go Sidecar for sub-millisecond
            cached responses.
          </p>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {docSections.map((section) => (
            <li key={section.slug}>
              <Link
                href={`/docs/${section.slug}`}
                className="group flex h-full flex-col justify-between gap-6 rounded-xl border-2 border-stone-900 bg-white p-6 transition hover:bg-stone-900 hover:text-[#faf8f3]"
              >
                <div className="flex flex-col gap-2">
                  <span
                    className={`inline-block h-2 w-8 ${section.color} transition group-hover:opacity-80`}
                  />
                  <h2 className="text-base font-semibold leading-snug group-hover:text-[#4ade80]">
                    {section.title}
                  </h2>
                  <p className="text-sm text-stone-600 group-hover:text-stone-300">
                    {section.desc}
                  </p>
                </div>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-stone-400 group-hover:text-stone-500">
                  /docs/{section.slug}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <footer className="border-t-2 border-stone-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-8 lg:px-8">
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
