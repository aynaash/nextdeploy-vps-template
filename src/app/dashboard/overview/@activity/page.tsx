// Parallel slot: @activity
export default function ActivitySlot() {
  const events = [
    { action: "Shipped", project: "api-service", time: "2m ago", status: "live" },
    { action: "Rolled back", project: "web-app", time: "1h ago", status: "rolled-back" },
    { action: "Build failed", project: "worker", time: "3h ago", status: "failed" },
  ];

  const statusColor: Record<string, string> = {
    live: "text-[#006600]",
    "rolled-back": "text-stone-400",
    failed: "text-[#BB0000]",
  };

  return (
    <div className="rounded-xl border-2 border-stone-900 bg-white p-6">
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-stone-500">
        @activity slot
      </p>
      <h2 className="mt-2 text-lg font-semibold text-stone-900">Recent activity</h2>
      <ul className="mt-4 flex flex-col gap-3">
        {events.map((e, i) => (
          <li key={i} className="flex items-center justify-between text-sm">
            <span className="text-stone-700">
              <span className="font-medium">{e.action}</span> · {e.project}
            </span>
            <span className="flex items-center gap-2">
              <span className={`font-mono text-xs ${statusColor[e.status]}`}>{e.status}</span>
              <span className="text-xs text-stone-400">{e.time}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
