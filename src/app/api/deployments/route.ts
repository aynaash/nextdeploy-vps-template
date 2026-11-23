import { NextResponse } from "next/server";

// GET /api/deployments — list recent deployments
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    deployments: [
      { id: "deploy-123", projectId: "demo-project", commit: "a1b2c3d", message: "feat: add health check endpoint", status: "live" },
      { id: "deploy-456", projectId: "api-service", commit: "e4f5g6h", message: "fix: resolve build error in auth flow", status: "failed" },
      { id: "deploy-789", projectId: "demo-project", commit: "i7j8k9l", message: "chore: bump dependencies", status: "rolled-back" },
    ],
  });
}
