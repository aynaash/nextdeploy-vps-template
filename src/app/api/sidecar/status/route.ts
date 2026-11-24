import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    enabled: true,
    version: "1.2.0",
    cacheHits: 1842,
    cacheMisses: 231,
    imagesServed: 94,
    avgLatencyMs: 0.4,
    workers: 4,
    uptime: 86400,
  });
}
