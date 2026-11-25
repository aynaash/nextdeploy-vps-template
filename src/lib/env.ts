import { z } from "zod";

// Fail fast on misconfiguration: validate the environment once, at import time,
// so a missing secret is a clear startup error instead of a mysterious 500.
// During `next build` (e.g. in CI, where runtime secrets live only on the VPS),
// Next.js imports server modules while collecting page data; allow safe
// build-only placeholders during phase-production-build so builds never need
// production secrets.
const schema = z.object({
  DATABASE_URL: z
    .string()
    .min(1, "required — your Neon/Postgres connection string"),
  BETTER_AUTH_SECRET: z
    .string()
    .min(1, "required — generate with: openssl rand -base64 32"),
  // Optional in dev (better-auth infers it); set to https://your-domain.com in prod.
  BETTER_AUTH_URL: z.url().optional(),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";

const rawEnv = isBuildPhase
  ? {
      ...process.env,
      DATABASE_URL:
        process.env.DATABASE_URL ||
        "postgresql://build:build@localhost:5432/build",
      BETTER_AUTH_SECRET:
        process.env.BETTER_AUTH_SECRET ||
        "build-time-placeholder-secret-not-used-at-runtime",
    }
  : process.env;

const parsed = schema.safeParse(rawEnv);

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((i) => `  • ${i.path.join(".")}: ${i.message}`)
    .join("\n");
  throw new Error(
    `Invalid environment variables:\n${issues}\n\nCopy .env.example to .env and fill these in.`,
  );
}

export const env = parsed.data;
