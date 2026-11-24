"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { rollbackToRelease, type ActionState } from "./actions";

function RollbackButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg border border-stone-300 px-3 py-1.5 text-xs font-medium text-stone-600 transition hover:border-[#BB0000] hover:bg-[#BB0000]/5 hover:text-[#BB0000] disabled:opacity-50"
    >
      {pending ? "Rolling back…" : "Rollback"}
    </button>
  );
}

export function RollbackForm({ releaseId }: { releaseId: string }) {
  const [state, action] = useActionState<ActionState, FormData>(
    rollbackToRelease,
    undefined,
  );

  return (
    <form action={action} className="flex flex-col items-end gap-1">
      <input type="hidden" name="releaseId" value={releaseId} />
      <RollbackButton />
      {state?.error && (
        <p className="text-xs text-[#BB0000]">{state.error}</p>
      )}
    </form>
  );
}
