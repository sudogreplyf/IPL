import { NextResponse } from "next/server";
import { getCache, setCache } from "@/lib/cache";
import { fetchTeamsFromSheet } from "@/lib/sheetsClient";

const CACHE_KEY = "teams";
const TTL_SECONDS = 60;

export async function GET() {
  try {
    const cached = getCache(CACHE_KEY);

    if (cached) {
      return NextResponse.json({
        data: cached.data,
        lastUpdated: cached.updatedAt,
        cached: true
      });
    }

    const teams = await fetchTeamsFromSheet();
    const stored = setCache(CACHE_KEY, teams, TTL_SECONDS);

    return NextResponse.json({
      data: teams,
      lastUpdated: stored.updatedAt,
      cached: false
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error fetching teams"
      },
      { status: 500 }
    );
  }
}
