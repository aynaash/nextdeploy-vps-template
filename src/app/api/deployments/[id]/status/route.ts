import { NextResponse } from "next/server";

// GET /api/deployments/:id/status
// Deeper nested dynamic API route — demonstrates two dynamic levels aren't needed
// here since only the id varies, but the nesting pattern itself is what's under test.

const DEMO_STATUS: Record<string, string> = {
  "deploy-123": "live",
  "deploy-456": "failed",
  "deploy-789": "rolled-back",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const status = DEMO_STATUS[id];

  if (!status) {
    return NextResponse.json({ error: "deployment not found" }, { status: 404 });
  }

  return NextResponse.json({
    deploymentId: id,
    status,
    checkedAt: new Date().toISOString(),
  });
}
