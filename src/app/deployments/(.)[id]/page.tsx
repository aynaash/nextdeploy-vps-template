"use client";

import { use } from "react";
import { useRouter } from "next/navigation";

// Intercepting route — same-level interception marker (.)
// Rendered when /deployments/[id] is navigated to client-side from /deployments.
// Direct URL access bypasses this and uses app/deployments/[id]/page.tsx.

const DEMO_DEPLOYMENTS: Record<
  string,
  { project: string; commit: string; message: string; status: string }
> = {
  "deploy-123": { project: "api-service", commit: "a1b2c3d", message: "feat: add health check endpoint", status: "live" },
  "deploy-456": { project: "web-app", commit: "e4f5g6h", message: "fix: resolve build error in auth flow", status: "failed" },
  "deploy-789": { project: "worker", commit: "i7j8k9l", message: "chore: bump dependencies", status: "rolled-back" },
};

const statusStyle: Record<string, string> = {
  live: "bg-[#006600]/10 text-[#006600]",
  failed: "bg-[#BB0000]/10 text-[#BB0000]",
  "rolled-back": "bg-stone-100 text-stone-500",
};

export default function DeploymentModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const deploy = DEMO_DEPLOYMENTS[id];

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm"
      onClick={() => router.back()}
    >
      {/* Modal panel */}
      <div
        className="relative w-full max-w-md rounded-2xl border-2 border-stone-900 bg-[#faf8f3] p-7 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-stone-500">
              intercepted · app/deployments/(.)[id]/page.tsx
            </p>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-stone-900">
              {deploy?.project ?? id}
            </h2>
          </div>
          <button
            onClick={() => router.back()}
            className="shrink-0 rounded-lg border border-stone-200 px-3 py-1 font-mono text-xs text-stone-500 hover:bg-stone-100"
          >
            ✕ close
          </button>
        </div>

        {deploy ? (
          <dl className="mt-5 divide-y divide-stone-100 text-sm">
            {(
              [
                ["Commit", deploy.commit],
                ["Message", deploy.message],
                ["Status", deploy.status],
              ] as const
            ).map(([label, value]) => (
              <div key={label} className="flex items-center justify-between py-3">
                <dt className="text-stone-400">{label}</dt>
                <dd className={`font-medium ${label === "Status" ? `${statusStyle[value] ?? ""} rounded-full px-2 py-0.5 text-xs` : "text-stone-900"}`}>
                  {label === "Commit" ? <span className="font-mono">{value}</span> : value}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="mt-4 text-sm text-stone-500">Deployment &quot;{id}&quot; not found.</p>
        )}
      </div>
    </div>
  );
}
