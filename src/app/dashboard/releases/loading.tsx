export default function ReleasesLoading() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10">
      <div className="flex flex-col gap-2">
        <div className="h-7 w-32 animate-pulse rounded-lg bg-stone-200" />
        <div className="h-4 w-72 animate-pulse rounded bg-stone-200/70" />
      </div>

      <ol className="relative flex flex-col">
        <div className="absolute bottom-0 left-[11px] top-0 w-px bg-stone-200" />
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="relative flex gap-5 pb-8 last:pb-0">
            <span className="relative z-10 mt-1 h-5 w-5 shrink-0 animate-pulse rounded-full border-2 border-stone-200 bg-stone-100" />
            <div className="flex flex-1 flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="h-5 w-10 animate-pulse rounded bg-stone-200" />
                <div className="h-4 w-16 animate-pulse rounded bg-stone-200" />
                <div className="h-5 w-20 animate-pulse rounded-full bg-stone-200" />
              </div>
              <div className="h-4 w-64 animate-pulse rounded bg-stone-200/70" />
              <div className="flex justify-between border-t border-stone-100 pt-3">
                <div className="h-3 w-32 animate-pulse rounded bg-stone-200" />
                <div className="h-6 w-20 animate-pulse rounded-lg bg-stone-200" />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}
