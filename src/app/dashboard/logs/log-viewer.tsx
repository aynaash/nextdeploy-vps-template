"use client";

import { useState } from "react";

type LogType = "APP" | "ERROR" | "DEPLOY";

type LogEntry = {
  id: string;
  ts: string;
  type: LogType;
  message: string;
};

const LOG_ENTRIES: LogEntry[] = [
  { id: "1", ts: "2026-11-24T02:28:01Z", type: "DEPLOY", message: "▶ nextdeploy ship — starting release v24" },
  { id: "2", ts: "2026-11-24T02:28:03Z", type: "DEPLOY", message: "✓ Bundle uploaded (4.2 MB)" },
  { id: "3", ts: "2026-11-24T02:28:08Z", type: "APP",    message: "Starting Next.js 16 on port 3002…" },
  { id: "4", ts: "2026-11-24T02:28:09Z", type: "APP",    message: "✓ Compiled /app/page in 1.2s" },
  { id: "5", ts: "2026-11-24T02:28:09Z", type: "APP",    message: "✓ Compiled /dashboard/page in 0.8s" },
  { id: "6", ts: "2026-11-24T02:28:10Z", type: "APP",    message: "✓ Ready — started server on 0.0.0.0:3002 (url: http://localhost:3002)" },
  { id: "7", ts: "2026-11-24T02:28:11Z", type: "DEPLOY", message: "→ Health check GET /api/health on :3002" },
  { id: "8", ts: "2026-11-24T02:28:11Z", type: "DEPLOY", message: "✓ Health check passed — { status: ok, latencyMs: 12 }" },
  { id: "9", ts: "2026-11-24T02:28:12Z", type: "DEPLOY", message: "✓ Traffic flipped :3000 → :3002" },
  { id: "10", ts: "2026-11-24T02:28:12Z", type: "DEPLOY", message: "✓ Release v24 is live (commit a1b2c3d)" },
  { id: "11", ts: "2026-11-24T02:29:00Z", type: "APP",    message: "GET /dashboard 200 in 34ms" },
  { id: "12", ts: "2026-11-24T02:29:01Z", type: "APP",    message: "GET /api/health 200 in 8ms" },
  { id: "13", ts: "2026-11-24T02:30:15Z", type: "ERROR",  message: "TypeError: Cannot read properties of undefined (reading 'id') at ProjectsPage" },
  { id: "14", ts: "2026-11-24T02:30:15Z", type: "ERROR",  message: "  at async requireSession (/releases/v24/src/lib/session.ts:12)" },
  { id: "15", ts: "2026-11-24T02:30:16Z", type: "APP",    message: "GET /dashboard/projects 500 in 42ms" },
  { id: "16", ts: "2026-11-24T02:31:00Z", type: "APP",    message: "GET /api/health 200 in 7ms" },
  { id: "17", ts: "2026-11-24T02:32:00Z", type: "APP",    message: "POST /api/auth/sign-in 200 in 198ms" },
  { id: "18", ts: "2026-11-24T02:33:10Z", type: "APP",    message: "GET /dashboard/sidecar 200 in 22ms" },
  { id: "19", ts: "2026-11-24T02:34:00Z", type: "DEPLOY", message: "→ nextdeployd: go-sidecar cache purged (1842 entries removed)" },
  { id: "20", ts: "2026-11-24T02:35:00Z", type: "APP",    message: "GET /api/sidecar/status 200 in 5ms" },
];

const TYPE_STYLES: Record<LogType, string> = {
  APP: "bg-[#006600]/10 text-[#006600]",
  ERROR: "bg-[#BB0000]/10 text-[#BB0000]",
  DEPLOY: "bg-[#F5A623]/15 text-[#946200]",
};

type Tab = "ALL" | LogType;

const TABS: { key: Tab; label: string }[] = [
  { key: "ALL", label: "All" },
  { key: "APP", label: "APP" },
  { key: "ERROR", label: "ERROR" },
  { key: "DEPLOY", label: "DEPLOY" },
];

function formatTs(ts: string) {
  return new Date(ts).toISOString().replace("T", " ").slice(0, 19);
}

export function LogViewer() {
  const [active, setActive] = useState<Tab>("ALL");

  const filtered =
    active === "ALL" ? LOG_ENTRIES : LOG_ENTRIES.filter((e) => e.type === active);

  return (
    <div className="flex flex-col gap-4">
      {/* Filter tabs */}
      <div className="flex items-center gap-1 border-b-2 border-stone-900 pb-0">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActive(tab.key)}
            className={`-mb-0.5 border-b-2 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.15em] transition ${
              active === tab.key
                ? "border-[#006600] text-stone-900"
                : "border-transparent text-stone-500 hover:text-stone-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
        <span className="ml-auto font-mono text-xs text-stone-400">
          {filtered.length} lines
        </span>
      </div>

      {/* Terminal */}
      <div className="max-h-[560px] overflow-y-auto rounded-xl border-2 border-stone-900 bg-stone-950 p-4 font-mono text-xs leading-relaxed">
        {filtered.map((entry) => (
          <div key={entry.id} className="flex items-start gap-3 py-0.5">
            <span className="shrink-0 select-none text-stone-500">
              {formatTs(entry.ts)}
            </span>
            <span
              className={`shrink-0 rounded px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-widest ${TYPE_STYLES[entry.type]}`}
            >
              {entry.type}
            </span>
            <span
              className={
                entry.type === "ERROR"
                  ? "text-[#f87171]"
                  : entry.type === "DEPLOY"
                    ? "text-[#F5A623]"
                    : "text-stone-300"
              }
            >
              {entry.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
