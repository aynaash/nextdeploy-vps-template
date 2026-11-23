import { NextResponse } from "next/server";

// GET /api/projects — returns a static fixture for smoke-testing route resolution.
// A real implementation would query Postgres via Drizzle after verifying the session.
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    projects: [
      { id: "demo-project", name: "demo-project", domain: "demo.nextdeploy.dev", status: "live" },
      { id: "api-service", name: "api-service", domain: "api.demo.nextdeploy.dev", status: "building" },
    ],
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.name) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }

  // In production: insert into Postgres via Server Action or this route,
  // then return the created row. Here we echo back for demo purposes.
  return NextResponse.json(
    {
      id: crypto.randomUUID(),
      name: body.name,
      domain: body.domain ?? null,
      status: "building",
      createdAt: new Date().toISOString(),
    },
    { status: 201 },
  );
}
