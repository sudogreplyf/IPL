export function LeaderboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-36 rounded-2xl bg-white/10" />
        ))}
      </div>
      <div className="h-72 rounded-2xl bg-white/10" />
    </div>
  );
}
