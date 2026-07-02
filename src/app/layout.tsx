import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "NextDeploy Template",
  description:
    "Next.js + better-auth + Neon Postgres, deployed to your own VPS with one command.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 text-stone-900 antialiased">
        {children}
      </body>
    </html>
  );
}
