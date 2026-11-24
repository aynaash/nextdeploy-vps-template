"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import {
  toggleSidecar,
  purgeSidecarCache,
  updateSidecarConfig,
  type ActionState,
} from "./actions";

function SubmitButton({
  label,
  pendingLabel,
  variant = "default",
}: {
  label: string;
  pendingLabel: string;
  variant?: "default" | "green" | "red" | "outline";
}) {
  const { pending } = useFormStatus();

  const styles: Record<string, string> = {
    default:
      "rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-800 disabled:opacity-50",
    green:
      "rounded-lg bg-[#006600] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#005500] disabled:opacity-50",
    red: "rounded-lg bg-[#BB0000] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#990000] disabled:opacity-50",
    outline:
      "rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 disabled:opacity-50",
  };

  return (
    <button
      type="submit"
      disabled={pending}
      className={styles[variant]}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}

export function ToggleForm({ enabled }: { enabled: boolean }) {
  const [state, action] = useActionState<ActionState, FormData>(
    toggleSidecar,
    undefined,
  );

  return (
    <form action={action} className="flex flex-col gap-2">
      <SubmitButton
        label={enabled ? "Disable Sidecar" : "Enable Sidecar"}
        pendingLabel={enabled ? "Disabling…" : "Enabling…"}
        variant={enabled ? "red" : "green"}
      />
      {state?.error && (
        <p className="text-sm text-[#BB0000]">{state.error}</p>
      )}
    </form>
  );
}

export function PurgeCacheForm() {
  const [state, action] = useActionState<ActionState, FormData>(
    purgeSidecarCache,
    undefined,
  );

  return (
    <form action={action} className="flex flex-col gap-2">
      <SubmitButton
        label="Purge cache"
        pendingLabel="Purging…"
        variant="outline"
      />
      {state?.error && (
        <p className="text-sm text-[#BB0000]">{state.error}</p>
      )}
    </form>
  );
}

export function WorkerConfigForm({ current }: { current: number }) {
  const [state, action] = useActionState<ActionState, FormData>(
    updateSidecarConfig,
    undefined,
  );

  return (
    <form action={action} className="flex flex-col gap-3">
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-stone-700">
          Image workers{" "}
          <span className="text-stone-400">(1–16)</span>
        </span>
        <div className="flex items-center gap-2">
          <input
            name="max_image_workers"
            type="number"
            min={1}
            max={16}
            defaultValue={current}
            className="w-24 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none transition focus:border-[#006600] focus:ring-2 focus:ring-[#006600]/20"
          />
          <SubmitButton label="Save" pendingLabel="Saving…" />
        </div>
      </label>
      {state?.error && (
        <p className="text-sm text-[#BB0000]">{state.error}</p>
      )}
      {state === undefined && (
        <span /> // cleared state — no message
      )}
    </form>
  );
}
