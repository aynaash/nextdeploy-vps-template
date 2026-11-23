import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Overview" };

export default function OverviewPage() {
  return (
    <div className="rounded-xl border-2 border-stone-900 bg-white p-6">
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-stone-500">
        app/dashboard/overview/page.tsx · parallel routes
      </p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-stone-900">
        Overview (main slot)
      </h1>
      <p className="mt-3 text-sm text-stone-600">
        This is the <code className="rounded bg-stone-200 px-1 py-0.5 text-xs">children</code> slot
        in the layout. The two panels below are independent parallel slots —{" "}
        <code className="rounded bg-stone-200 px-1 py-0.5 text-xs">@analytics</code> and{" "}
        <code className="rounded bg-stone-200 px-1 py-0.5 text-xs">@activity</code> — rendered by
        the same layout without being nested inside each other.
      </p>
      <Link
        href="/routes-demo"
        className="mt-4 inline-block font-mono text-[0.65rem] uppercase tracking-[0.15em] text-stone-400 hover:text-stone-900"
      >
        ← routes demo
      </Link>
    </div>
  );
}
