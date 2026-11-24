import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const DEMO_RELEASES = [
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

export async function GET() {
  return NextResponse.json({
    releases: DEMO_RELEASES,
    total: DEMO_RELEASES.length,
  });
}
