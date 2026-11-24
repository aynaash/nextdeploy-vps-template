import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const DEMO_LOGS = [
  { id: "1",  ts: "2026-11-24T02:28:01Z", type: "DEPLOY", message: "▶ nextdeploy ship — starting release v24" },
  { id: "2",  ts: "2026-11-24T02:28:03Z", type: "DEPLOY", message: "✓ Bundle uploaded (4.2 MB)" },
  { id: "3",  ts: "2026-11-24T02:28:08Z", type: "APP",    message: "Starting Next.js 16 on port 3002…" },
  { id: "4",  ts: "2026-11-24T02:28:09Z", type: "APP",    message: "✓ Compiled /app/page in 1.2s" },
  { id: "5",  ts: "2026-11-24T02:28:09Z", type: "APP",    message: "✓ Compiled /dashboard/page in 0.8s" },
  { id: "6",  ts: "2026-11-24T02:28:10Z", type: "APP",    message: "✓ Ready — started server on 0.0.0.0:3002" },
  { id: "7",  ts: "2026-11-24T02:28:11Z", type: "DEPLOY", message: "→ Health check GET /api/health on :3002" },
  { id: "8",  ts: "2026-11-24T02:28:11Z", type: "DEPLOY", message: "✓ Health check passed — { status: ok, latencyMs: 12 }" },
  { id: "9",  ts: "2026-11-24T02:28:12Z", type: "DEPLOY", message: "✓ Traffic flipped :3000 → :3002" },
  { id: "10", ts: "2026-11-24T02:28:12Z", type: "DEPLOY", message: "✓ Release v24 is live (commit a1b2c3d)" },
  { id: "11", ts: "2026-11-24T02:29:00Z", type: "APP",    message: "GET /dashboard 200 in 34ms" },
  { id: "12", ts: "2026-11-24T02:29:01Z", type: "APP",    message: "GET /api/health 200 in 8ms" },
  { id: "13", ts: "2026-11-24T02:30:15Z", type: "ERROR",  message: "TypeError: Cannot read properties of undefined (reading 'id')" },
  { id: "14", ts: "2026-11-24T02:30:15Z", type: "ERROR",  message: "  at async requireSession (/releases/v24/src/lib/session.ts:12)" },
  { id: "15", ts: "2026-11-24T02:30:16Z", type: "APP",    message: "GET /dashboard/projects 500 in 42ms" },
  { id: "16", ts: "2026-11-24T02:31:00Z", type: "APP",    message: "GET /api/health 200 in 7ms" },
  { id: "17", ts: "2026-11-24T02:32:00Z", type: "APP",    message: "POST /api/auth/sign-in 200 in 198ms" },
  { id: "18", ts: "2026-11-24T02:33:10Z", type: "APP",    message: "GET /dashboard/sidecar 200 in 22ms" },
  { id: "19", ts: "2026-11-24T02:34:00Z", type: "DEPLOY", message: "→ nextdeployd: go-sidecar cache purged (1842 entries removed)" },
  { id: "20", ts: "2026-11-24T02:35:00Z", type: "APP",    message: "GET /api/sidecar/status 200 in 5ms" },
];

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const entry = DEMO_LOGS.find((l) => l.id === id);

  if (!entry) {
    return NextResponse.json({ error: "log entry not found" }, { status: 404 });
  }

  return NextResponse.json(entry);
}
