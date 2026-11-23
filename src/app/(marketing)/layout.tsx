// Shared layout for the (marketing) route group.
// Wraps /about and /pricing without touching their URLs.
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Add marketing-specific nav, analytics scripts, etc. here. */}
      {children}
    </div>
  );
}
