import Link from "next/link";

import { FlagStripe, Shield } from "@/components/flag-stripe";

// Demo of multiple dynamic segments: /shop/[category]/[productId]
export default async function ShopProductPage({
  params,
}: {
  params: Promise<{ category: string; productId: string }>;
}) {
  const { category, productId } = await params;

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
          app/shop/[category]/[productId]/page.tsx · multiple dynamic segments
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-stone-900">
          {category} / {productId}
        </h1>
        <div className="mt-6 rounded-xl border-2 border-stone-900 bg-white p-6">
          <p className="font-mono text-sm text-stone-500">{"// params received"}</p>
          <pre className="mt-3 font-mono text-sm text-stone-900">
            {JSON.stringify({ category, productId }, null, 2)}
          </pre>
        </div>
        <p className="mt-6 text-sm text-stone-500">
          URL structure: <code className="rounded bg-stone-200 px-1 py-0.5 text-xs">/shop/[category]/[productId]</code>.
          Both segments are independently addressable.
        </p>
      </main>
    </div>
  );
}
