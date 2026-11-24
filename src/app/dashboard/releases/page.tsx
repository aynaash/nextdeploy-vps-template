import type { Metadata } from "next";

import { RollbackForm } from "./rollback-form";

export const metadata: Metadata = { title: "Releases" };

type ReleaseStatus = "live" | "building" | "failed" | "rolled-back";

type Release = {
  id: string;
  version: string;
  commit: string;
  message: string;
  status: ReleaseStatus;
  createdAt: string;
};

const STATUS_STYLE: Record<ReleaseStatus, string> = {
  live: "bg-[#006600]/10 text-[#006600]",
  building: "bg-[#F5A623]/15 text-[#946200]",
  failed: "bg-[#BB0000]/10 text-[#BB0000]",
  "rolled-back": "bg-stone-100 text-stone-500",
};

const DEMO_RELEASES: Release[] = [
  { id: "rel-24", version: "v24", commit: "a1b2c3d", message: "feat: add Go Sidecar dashboard page",        status: "live",         createdAt: "2026-11-24T02:28:12Z" },
  { id: "rel-23", version: "v23", commit: "f9e8d7c", message: "fix: health check latency reporting",        status: "rolled-back",  createdAt: "2026-11-24T00:49:14Z" },
  { id: "rel-22", version: "v22", commit: "b3c4d5e", message: "feat: releases timeline page",               status: "rolled-back",  createdAt: "2026-11-23T22:30:00Z" },
  { id: "rel-21", version: "v21", commit: "e6f7g8h", message: "chore: bump next to 16.4.6",                 status: "rolled-back",  createdAt: "2026-11-23T20:11:55Z" },
  { id: "rel-20", version: "v20", commit: "i9j0k1l", message: "feat: docs pages for VPS overview",         status: "rolled-back",  createdAt: "2026-11-23T18:05:30Z" },
  { id: "rel-19", version: "v19", commit: "m2n3o4p", message: "fix: parallel routes default.tsx missing",  status: "failed",       createdAt: "2026-11-23T16:44:00Z" },
  { id: "rel-18", version: "v18", commit: "q5r6s7t", message: "feat: intercepting routes modal",           status: "rolled-back",  createdAt: "2026-11-23T14:20:10Z" },
  { id: "rel-17", version: "v17", commit: "u8v9w0x", message: "feat: dashboard overview parallel routes",  status: "rolled-back",  createdAt: "2026-11-23T12:00:00Z" },
  { id: "rel-16", version: "v16", commit: "y1z2a3b", message: "chore: drizzle schema add deployment table",status: "rolled-back",  createdAt: "2026-11-23T10:30:45Z" },
  { id: "rel-15", version: "v15", commit: "c4d5e6f", message: "feat: initial NextDeploy VPS template",     status: "rolled-back",  createdAt: "2026-11-23T08:00:00Z" },
];

function timeAgo(iso: string) {
  const seconds = Math.max(
    0,
    Math.floor((Date.now() - new Date(iso).getTime()) / 1000),
  );
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default function ReleasesPage() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-stone-900">
          Releases
        </h1>
        <p className="text-sm text-stone-500">
          Full deployment history. Roll back to any previous release instantly.
        </p>
      </div>

      <ol className="relative flex flex-col">
        {/* Timeline line */}
        <div className="absolute bottom-0 left-[11px] top-0 w-px bg-stone-200" />

        {DEMO_RELEASES.map((rel, idx) => (
          <li key={rel.id} className="relative flex gap-5 pb-8 last:pb-0">
            {/* Dot */}
            <span
              className={`relative z-10 mt-1 h-5 w-5 shrink-0 rounded-full border-2 ${
                rel.status === "live"
                  ? "border-[#006600] bg-[#006600]"
                  : rel.status === "failed"
                    ? "border-[#BB0000] bg-[#BB0000]"
                    : "border-stone-300 bg-white"
              }`}
            />

            {/* Card */}
            <div className="flex flex-1 flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-semibold text-stone-900">
                    {rel.version}
                  </span>
                  <span className="font-mono text-xs text-stone-400">
                    {rel.commit}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLE[rel.status]}`}
                  >
                    {rel.status}
                  </span>
                </div>
                <span className="text-xs text-stone-400">
                  {timeAgo(rel.createdAt)}
                </span>
              </div>

              <p className="text-sm text-stone-700">{rel.message}</p>

              <div className="flex items-center justify-between gap-2 border-t border-stone-100 pt-3">
                <span className="text-xs text-stone-400">
                  {new Date(rel.createdAt).toLocaleString("en-KE", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                {/* Only show rollback for non-current, non-failed releases */}
                {idx !== 0 && rel.status !== "failed" && (
                  <RollbackForm releaseId={rel.id} />
                )}
                {rel.status === "live" && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#006600]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#006600]" />
                    Current
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}
