import { NextResponse } from "next/server";

// GET  /api/projects/:id — dynamic API route
// PATCH /api/projects/:id — partial update
// DELETE /api/projects/:id — remove

const DEMO: Record<string, object> = {
  "demo-project": { id: "demo-project", name: "demo-project", domain: "demo.nextdeploy.dev", status: "live" },
  "api-service": { id: "api-service", name: "api-service", domain: "api.demo.nextdeploy.dev", status: "building" },
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const project = DEMO[id];

  if (!project) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));

  if (!DEMO[id]) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  return NextResponse.json({ ...DEMO[id], ...body, updatedAt: new Date().toISOString() });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!DEMO[id]) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  return NextResponse.json({ deleted: id });
}
