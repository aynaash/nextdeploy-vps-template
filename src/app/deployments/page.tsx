import type { Metadata } from "next";
import Link from "next/link";

import { FlagStripe, Shield } from "@/components/flag-stripe";

// Intercepting route demo — the feed page.
// Clicking a row links to /deployments/[id]. If navigated client-side from here,
// Next.js intercepts with app/deployments/(.)deployments/[id]/page.tsx (the modal).
// If you open /deployments/[id] directly, you get the full-page version.

const DEMO_DEPLOYMENTS = [
  { id: "deploy-123", project: "api-service", commit: "a1b2c3d", status: "live", time: "2m ago" },
  { id: "deploy-456", project: "web-app", commit: "e4f5g6h", status: "failed", time: "1h ago" },
  { id: "deploy-789", project: "worker", commit: "i7j8k9l", status: "rolled-back", time: "3h ago" },
];

const statusStyle: Record<string, string> = {
  live: "bg-[#006600]/10 text-[#006600]",
  failed: "bg-[#BB0000]/10 text-[#BB0000]",
  "rolled-back": "bg-stone-100 text-stone-500",
};

export const metadata: Metadata = { title: "Deployments" };

export default function DeploymentsPage() {
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
          app/deployments/page.tsx · intercepting route — feed
        </p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-stone-900">Deployments</h1>
        <p className="mt-2 text-sm text-stone-500">
          Click a row. Client-side navigation intercepts with a modal (
          <code className="rounded bg-stone-200 px-1 py-0.5 text-xs">(.)[id]</code>). Open the
          same URL directly and you get the full page.
        </p>

        <ul className="mt-6 overflow-hidden rounded-xl border-2 border-stone-900 divide-y-2 divide-stone-900">
          {DEMO_DEPLOYMENTS.map((d) => (
            <li key={d.id}>
              <Link
                href={`/deployments/${d.id}`}
                className="flex items-center justify-between bg-white px-5 py-4 transition hover:bg-stone-50"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium text-stone-900">{d.project}</span>
                  <span className="font-mono text-xs text-stone-400">{d.commit}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle[d.status]}`}
                  >
                    {d.status}
                  </span>
                  <span className="text-xs text-stone-400">{d.time}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
