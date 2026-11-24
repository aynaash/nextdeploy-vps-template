import { NextResponse } from "next/server";

import { DEMO_RELEASES } from "../route";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const release = DEMO_RELEASES.find((r) => r.id === id);

  if (!release) {
    return NextResponse.json({ error: "release not found" }, { status: 404 });
  }

  return NextResponse.json(release);
}

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const release = DEMO_RELEASES.find((r) => r.id === id);

  if (!release) {
    return NextResponse.json({ error: "release not found" }, { status: 404 });
  }

  return NextResponse.json({
    rolledBack: true,
    releaseId: id,
  });
}
