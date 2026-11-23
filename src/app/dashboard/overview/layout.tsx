// Parallel routes demo: this layout receives the main slot (children) plus two
// named slots (@analytics and @activity). Next.js injects each slot from its
// corresponding folder inside the same route segment.
export default function OverviewLayout({
  children,
  analytics,
  activity,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  activity: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10">
      <main>{children}</main>
      <div className="grid gap-6 lg:grid-cols-2">
        <aside>{analytics}</aside>
        <section>{activity}</section>
      </div>
    </div>
  );
}
