import type { Metadata } from "next";

import { LogViewer } from "./log-viewer";

export const metadata: Metadata = { title: "Logs" };

export default function LogsPage() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-stone-900">
            Logs
          </h1>
          <p className="text-sm text-stone-500">
            Application, error, and deploy log stream for this VPS.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#006600]/10 px-3 py-1 text-xs font-medium text-[#006600]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#006600]" />
          Live
        </span>
      </div>

      <LogViewer />
    </main>
  );
}
