export default function LogsLoading() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10">
      {/* Header skeleton */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-2">
          <div className="h-7 w-16 animate-pulse rounded-lg bg-stone-200" />
          <div className="h-4 w-64 animate-pulse rounded bg-stone-200/70" />
        </div>
        <div className="h-7 w-16 animate-pulse rounded-full bg-stone-200" />
      </div>

      {/* Tab bar skeleton */}
      <div className="flex gap-2 border-b-2 border-stone-900 pb-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-8 animate-pulse rounded bg-stone-200"
            style={{ width: `${48 + i * 8}px` }}
          />
        ))}
      </div>

      {/* Terminal skeleton */}
      <div className="flex h-[560px] animate-pulse flex-col gap-2 overflow-hidden rounded-xl border-2 border-stone-900 bg-stone-950 p-4">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-3 w-36 rounded bg-stone-800" />
            <div className="h-4 w-14 rounded bg-stone-800" />
            <div
              className="h-3 rounded bg-stone-800"
              style={{ width: `${120 + ((i * 47) % 180)}px` }}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
