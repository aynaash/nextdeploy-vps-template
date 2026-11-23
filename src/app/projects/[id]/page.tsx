import Link from "next/link";
import { notFound } from "next/navigation";

import { FlagStripe, Shield } from "@/components/flag-stripe";

// Demo of a dynamic route that also shows notFound() usage: /projects/[id]
// In production this would query Postgres; here we use "demo-project" as a
// known fixture so the deployment smoke test always has a valid URL to hit.
const DEMO_PROJECTS: Record<string, { name: string; domain: string; status: string }> = {
  "demo-project": {
    name: "demo-project",
    domain: "demo.nextdeploy.dev",
    status: "live",
  },
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = DEMO_PROJECTS[id];

  // Any unknown id triggers the not-found UI — exercises the notFound() path.
  if (!project) {
    notFound();
  }

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
          app/projects/[id]/page.tsx · dynamic + notFound()
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-stone-900">
          {project.name}
        </h1>
        <div className="mt-6 rounded-xl border-2 border-stone-900 bg-white p-6">
          <p className="font-mono text-sm text-stone-500">{"// project data"}</p>
          <pre className="mt-3 font-mono text-sm text-stone-900">
            {JSON.stringify({ id, ...project }, null, 2)}
          </pre>
        </div>
        <p className="mt-6 text-sm text-stone-500">
          Visit <code className="rounded bg-stone-200 px-1 py-0.5 text-xs">/projects/anything-else</code> to
          see <code className="rounded bg-stone-200 px-1 py-0.5 text-xs">notFound()</code> render{" "}
          <code className="rounded bg-stone-200 px-1 py-0.5 text-xs">app/not-found.tsx</code>.
        </p>
      </main>
    </div>
  );
}
