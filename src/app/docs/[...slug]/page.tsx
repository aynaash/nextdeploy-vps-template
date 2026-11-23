import Link from "next/link";

import { FlagStripe, Shield } from "@/components/flag-stripe";

// Demo of catch-all: /docs/[...slug]
// Matches /docs/deploy, /docs/deploy/vps/caddy, etc.
// Does NOT match /docs alone — use [[...slug]] for that.
export default async function DocsPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
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
          app/docs/[...slug]/page.tsx · catch-all route
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-stone-900">
          Docs: {slug.join(" / ")}
        </h1>

        <div className="mt-6 rounded-xl border-2 border-stone-900 bg-white p-6">
          <p className="font-mono text-sm text-stone-500">{"// params received"}</p>
          <pre className="mt-3 font-mono text-sm text-stone-900">
            {JSON.stringify({ slug }, null, 2)}
          </pre>
        </div>

        <div className="mt-6 rounded-xl border border-stone-200 bg-white p-5">
          <p className="text-sm font-medium text-stone-700">Try these paths:</p>
          <ul className="mt-3 flex flex-col gap-1">
            {[
              "/docs/deploy",
              "/docs/deploy/vps",
              "/docs/deploy/vps/caddy",
              "/docs/secrets/load",
            ].map((path) => (
              <li key={path}>
                <Link
                  href={path}
                  className="font-mono text-sm text-[#006600] underline-offset-2 hover:underline"
                >
                  {path}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
