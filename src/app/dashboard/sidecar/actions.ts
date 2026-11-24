"use server";

import { revalidatePath } from "next/cache";

import { requireSession } from "@/lib/session";

export type ActionState = { error?: string } | undefined;

// In production: persist sidecar config to a DB table.
// Here we use a module-level Map as a demo store — survives the process lifetime
// but resets on server restart.
const sidecarState = new Map<string, unknown>([
  ["enabled", true],
  ["max_image_workers", 4],
  ["cache_purge_count", 0],
]);

export async function toggleSidecar(
  _prev: ActionState,
  _formData: FormData,
): Promise<ActionState> {
  await requireSession();

  const current = sidecarState.get("enabled") as boolean;
  sidecarState.set("enabled", !current);

  revalidatePath("/dashboard/sidecar");
  return undefined;
}

export async function purgeSidecarCache(
  _prev: ActionState,
  _formData: FormData,
): Promise<ActionState> {
  await requireSession();

  const prev = (sidecarState.get("cache_purge_count") as number) ?? 0;
  sidecarState.set("cache_purge_count", prev + 1);

  revalidatePath("/dashboard/sidecar");
  return undefined;
}

export async function updateSidecarConfig(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireSession();

  const raw = Number(formData.get("max_image_workers"));
  if (!Number.isInteger(raw) || raw < 1 || raw > 16) {
    return { error: "Worker count must be between 1 and 16" };
  }

  sidecarState.set("max_image_workers", raw);
  revalidatePath("/dashboard/sidecar");
  return undefined;
}
