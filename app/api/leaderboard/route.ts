import { NextResponse } from "next/server";
import { getCache, setCache } from "@/lib/cache";
import { fetchTeamsFromSheet } from "@/lib/sheetsClient";
import { getTrend } from "@/lib/utils";
import { RankedTeam, Team } from "@/lib/types";

const CACHE_KEY = "leaderboard";
const TTL_SECONDS = 60;

function toLeaderboard(teams: Team[]): RankedTeam[] {
  return teams
    .filter((team) => team.status.toLowerCase() === "accepted")
    .sort((a, b) => b.points - a.points)
    .map((team, index) => ({
      ...team,
      rank: index + 1,
      trend: getTrend(index)
    }));
}

export async function GET() {
  try {
    const cached = getCache<RankedTeam[]>(CACHE_KEY);

    if (cached) {
      return NextResponse.json({
        data: cached.data,
        lastUpdated: cached.updatedAt,
        biggestClimber: cached.data.find((team) => team.trend === "up")?.teamName ?? null,
        cached: true
      });
    }

    const teams = await fetchTeamsFromSheet();
    const leaderboard = toLeaderboard(teams);
    const stored = setCache(CACHE_KEY, leaderboard, TTL_SECONDS);

    return NextResponse.json({
      data: leaderboard,
      lastUpdated: stored.updatedAt,
      biggestClimber: leaderboard.find((team) => team.trend === "up")?.teamName ?? null,
      cached: false
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error fetching leaderboard"
      },
      { status: 500 }
    );
  }
}
