"use server";

import { revalidatePath } from "next/cache";

import { requireSession } from "@/lib/session";

export type ActionState = { error?: string } | undefined;

// In production: write rollback state to a DB table and trigger the daemon.
// Here we track the last rolled-back release id in a module-level Map.
const rollbackLog = new Map<string, string>();

export async function rollbackToRelease(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireSession();

  const releaseId = String(formData.get("releaseId") ?? "").trim();
  if (!releaseId) {
    return { error: "Missing release ID" };
  }

  rollbackLog.set(releaseId, new Date().toISOString());

  revalidatePath("/dashboard/releases");
  revalidatePath("/dashboard");
  return undefined;
}
