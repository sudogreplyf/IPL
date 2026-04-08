import { LeaderboardSkeleton } from "@/components/leaderboard/skeleton";

export default function LoadingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <LeaderboardSkeleton />
    </main>
  );
}
