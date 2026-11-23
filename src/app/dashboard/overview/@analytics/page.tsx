// Parallel slot: @analytics
// Rendered alongside @activity by app/dashboard/overview/layout.tsx.
export default function AnalyticsSlot() {
  const mockData = [
    { label: "Total deploys", value: "24" },
    { label: "Live projects", value: "3" },
    { label: "Avg deploy time", value: "42s" },
    { label: "Uptime", value: "99.9%" },
  ];

  return (
    <div className="rounded-xl border-2 border-stone-900 bg-white p-6">
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-stone-500">
        @analytics slot
      </p>
      <h2 className="mt-2 text-lg font-semibold text-stone-900">Analytics</h2>
      <dl className="mt-4 grid grid-cols-2 gap-4">
        {mockData.map((d) => (
          <div key={d.label} className="rounded-lg bg-stone-50 p-3">
            <dt className="text-xs text-stone-500">{d.label}</dt>
            <dd className="mt-0.5 text-xl font-bold text-stone-900">{d.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
