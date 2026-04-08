import { LeaderboardClient } from "@/components/leaderboard/leaderboard-client";
import { RankedTeam } from "@/lib/types";

interface LeaderboardResponse {
  data: RankedTeam[];
  lastUpdated: string;
  biggestClimber: string | null;
}

async function getLeaderboard(): Promise<LeaderboardResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/leaderboard`, { next: { revalidate: 60 } });

  if (!response.ok) {
    throw new Error("Failed to load leaderboard.");
  }

  return response.json();
}

export default async function HomePage() {
  const leaderboard = await getLeaderboard();

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <LeaderboardClient
        teams={leaderboard.data}
        lastUpdated={leaderboard.lastUpdated}
        biggestClimber={leaderboard.biggestClimber}
      />
    </main>
  );
}
