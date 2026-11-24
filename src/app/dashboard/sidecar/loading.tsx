export default function SidecarLoading() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10">
      {/* Header skeleton */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="h-7 w-40 animate-pulse rounded-lg bg-stone-200" />
          <div className="h-4 w-72 animate-pulse rounded bg-stone-200/70" />
        </div>
        <div className="h-7 w-24 animate-pulse rounded-full bg-stone-200" />
      </div>

      {/* Stat cards skeleton */}
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-stone-200 bg-stone-200 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white px-6 py-6">
            <div className="h-3 w-20 animate-pulse rounded bg-stone-200" />
            <div className="mt-2 h-7 w-16 animate-pulse rounded bg-stone-200" />
            <div className="mt-1 h-3 w-24 animate-pulse rounded bg-stone-200/70" />
          </div>
        ))}
      </div>

      {/* Content skeleton */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="h-80 animate-pulse rounded-2xl border border-stone-200 bg-white" />
        <div className="flex flex-col gap-4">
          <div className="h-36 animate-pulse rounded-2xl border border-stone-200 bg-white" />
          <div className="h-36 animate-pulse rounded-2xl border border-stone-200 bg-white" />
        </div>
      </div>

      <div className="h-48 animate-pulse rounded-2xl border border-stone-200 bg-white" />
    </main>
  );
}
