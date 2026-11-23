import type { Metadata } from "next";
import Link from "next/link";

import { FlagStripe, Shield } from "@/components/flag-stripe";

// Route group demo: this file lives at app/(marketing)/about/page.tsx
// but the URL is /about — the (marketing) folder name is stripped from the path.
export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#faf8f3]">
      <FlagStripe />

      <header className="border-b-2 border-stone-900">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-6 w-5" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em]">NextDeploy</span>
          </Link>
          <Link
            href="/routes-demo"
            className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-stone-400 hover:text-stone-900"
          >
            ← routes demo
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-12">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-stone-500">
          app/(marketing)/about/page.tsx → /about · route group
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-stone-900">About</h1>
        <p className="mt-5 text-sm leading-relaxed text-stone-600">
          This page lives inside the <code className="rounded bg-stone-200 px-1 py-0.5 text-xs">(marketing)</code> route
          group. The group lets marketing pages share a layout (nav, footer, analytics) without
          changing their URLs. The folder name in parentheses never appears in the browser.
        </p>

        <div className="mt-8 rounded-xl border-2 border-stone-900 bg-white p-6">
          <p className="font-mono text-sm text-stone-500">{"// file → URL mapping"}</p>
          <pre className="mt-3 font-mono text-sm text-stone-900">{`app/(marketing)/about/page.tsx   →  /about
app/(marketing)/pricing/page.tsx →  /pricing
app/(marketing)/layout.tsx       →  shared by both`}</pre>
        </div>
      </main>
    </div>
  );
}
