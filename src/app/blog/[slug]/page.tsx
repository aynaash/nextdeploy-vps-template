import Link from "next/link";

import { FlagStripe, Shield } from "@/components/flag-stripe";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return { title: `Blog · ${slug}` };
}

// Demo of a single dynamic segment: /blog/[slug]
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

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
          app/blog/[slug]/page.tsx · dynamic route
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-stone-900">
          {slug}
        </h1>
        <div className="mt-6 rounded-xl border-2 border-stone-900 bg-white p-6">
          <p className="font-mono text-sm text-stone-500">{"// params received"}</p>
          <pre className="mt-3 font-mono text-sm text-stone-900">
            {JSON.stringify({ slug }, null, 2)}
          </pre>
        </div>
        <p className="mt-6 text-sm text-stone-500">
          This page renders for any <code className="rounded bg-stone-200 px-1 py-0.5 text-xs">/blog/*</code> path.
          Replace the content here with real post data fetched from your DB or CMS.
        </p>
      </main>
    </div>
  );
}
