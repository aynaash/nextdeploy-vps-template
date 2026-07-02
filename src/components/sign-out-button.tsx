"use client";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={async () => {
        await authClient.signOut();
        router.refresh();
      }}
      className="w-fit rounded-md border border-stone-300 px-4 py-2 text-sm font-medium hover:bg-stone-100"
    >
      Sign out
    </button>
  );
}
