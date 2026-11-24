import Link from "next/link";
import { notFound } from "next/navigation";

import { FlagStripe, Shield } from "@/components/flag-stripe";

// Full-page deployment detail — rendered when the URL is accessed directly.
// When navigated client-side from /deployments, the intercepting route
// (app/deployments/(.)[id]/page.tsx) shows a modal instead.

const DEMO_DEPLOYMENTS: Record<
  string,
  { project: string; commit: string; message: string; status: string; time: string; domain: string }
> = {
  "deploy-123": {
    project: "api-service",
    commit: "a1b2c3d",
    message: "feat: add health check endpoint",
    status: "live",
    time: "2m ago",
    domain: "api.demo.nextdeploy.dev",
  },
  "deploy-456": {
    project: "web-app",
    commit: "e4f5g6h",
    message: "fix: resolve build error in auth flow",
    status: "failed",
    time: "1h ago",
    domain: "demo.nextdeploy.dev",
  },
  "deploy-789": {
    project: "worker",
    commit: "i7j8k9l",
    message: "chore: bump dependencies",
    status: "rolled-back",
    time: "3h ago",
    domain: "worker.demo.nextdeploy.dev",
  },
};

const statusStyle: Record<string, string> = {
  live: "bg-[#006600]/10 text-[#006600]",
  failed: "bg-[#BB0000]/10 text-[#BB0000]",
  "rolled-back": "bg-stone-100 text-stone-500",
};

export default async function DeploymentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const deploy = DEMO_DEPLOYMENTS[id];

  if (!deploy) notFound();

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
            href="/deployments"
            className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-stone-400 hover:text-stone-900"
          >
            ← deployments
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-12">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-stone-500">
          app/deployments/[id]/page.tsx · full-page (direct URL access)
        </p>

        <div className="mt-3 flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-stone-900">{deploy.project}</h1>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle[deploy.status]}`}
          >
            {deploy.status}
          </span>
        </div>

        <div className="mt-6 rounded-xl border-2 border-stone-900 bg-white p-6">
          <dl className="grid grid-cols-2 gap-y-4 text-sm">
            {[
              ["Deployment ID", id],
              ["Commit", deploy.commit],
              ["Message", deploy.message],
              ["Domain", deploy.domain],
              ["Shipped", deploy.time],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-stone-400">{label}</dt>
                <dd className="mt-0.5 font-medium text-stone-900">
                  {label === "Commit" ? (
                    <span className="font-mono">{value}</span>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="mt-6 text-sm text-stone-500">
          Navigate back to{" "}
          <Link href="/deployments" className="text-[#006600] underline-offset-2 hover:underline">
            /deployments
          </Link>{" "}
          and click this row to see the intercepted modal version instead.
        </p>
      </main>
    </div>
  );
}
