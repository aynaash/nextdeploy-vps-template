import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CACHED_ROUTES = [
  { path: "/", hits: 842, sizeBytes: 14200, cachedAt: "2026-11-24T02:28:30Z" },
  { path: "/about", hits: 231, sizeBytes: 11800, cachedAt: "2026-11-24T02:29:10Z" },
  { path: "/pricing", hits: 189, sizeBytes: 13100, cachedAt: "2026-11-24T02:29:12Z" },
  { path: "/blog/hello-nextdeploy", hits: 94, sizeBytes: 9400, cachedAt: "2026-11-24T02:30:00Z" },
  { path: "/docs", hits: 76, sizeBytes: 10300, cachedAt: "2026-11-24T02:30:45Z" },
  { path: "/docs/vps/overview", hits: 58, sizeBytes: 12700, cachedAt: "2026-11-24T02:31:00Z" },
  { path: "/docs/vps/go-sidecar", hits: 112, sizeBytes: 15400, cachedAt: "2026-11-24T02:31:05Z" },
  { path: "/routes-demo", hits: 44, sizeBytes: 18200, cachedAt: "2026-11-24T02:32:00Z" },
];

export async function GET() {
  return NextResponse.json({
    count: CACHED_ROUTES.length,
    routes: CACHED_ROUTES,
  });
}

export async function DELETE() {
  return NextResponse.json({
    purged: true,
    count: CACHED_ROUTES.length,
    purgedAt: new Date().toISOString(),
  });
}
