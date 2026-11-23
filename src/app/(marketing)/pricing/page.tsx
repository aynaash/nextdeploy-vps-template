import type { Metadata } from "next";
import Link from "next/link";

import { FlagStripe, Shield } from "@/components/flag-stripe";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
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
          app/(marketing)/pricing/page.tsx → /pricing · route group
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-stone-900">Pricing</h1>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            { plan: "Open source", price: "$0", detail: "Self-hosted forever" },
            { plan: "VPS", price: "$5/mo", detail: "Your box, your rules" },
          ].map((tier) => (
            <div
              key={tier.plan}
              className="rounded-xl border-2 border-stone-900 bg-white p-6"
            >
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-stone-500">
                {tier.plan}
              </p>
              <p className="mt-2 text-4xl font-bold tracking-tight text-stone-900">
                {tier.price}
              </p>
              <p className="mt-1 text-sm text-stone-500">{tier.detail}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
