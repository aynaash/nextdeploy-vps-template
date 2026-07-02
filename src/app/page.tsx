import { headers } from "next/headers";
import Link from "next/link";

import { SignOutButton } from "@/components/sign-out-button";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-6 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        NextDeploy Template
      </h1>
      <p className="text-stone-600">
        Next.js (App Router) + better-auth + Neon Postgres. Deployed to a VPS
        you own with <code className="rounded bg-stone-200 px-1">nextdeploy up</code>.
      </p>

      {session ? (
        <div className="flex flex-col gap-3 rounded-lg border border-stone-200 bg-white p-6">
          <p>
            Signed in as <strong>{session.user.email}</strong>
          </p>
          <SignOutButton />
        </div>
      ) : (
        <div className="flex flex-col gap-3 rounded-lg border border-stone-200 bg-white p-6">
          <p>You are not signed in.</p>
          <Link
            href="/sign-in"
            className="w-fit rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700"
          >
            Sign in
          </Link>
        </div>
      )}
    </main>
  );
}
