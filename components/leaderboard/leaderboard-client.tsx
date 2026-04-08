"use client";

import { useMemo, useState } from "react";
import { RefreshCw, Search } from "lucide-react";
import { RankedTeam } from "@/lib/types";
import { minutesAgo } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Podium } from "@/components/leaderboard/podium";
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table";

interface LeaderboardClientProps {
  teams: RankedTeam[];
  lastUpdated: string;
  biggestClimber: string | null;
}

export function LeaderboardClient({ teams, lastUpdated, biggestClimber }: LeaderboardClientProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "accepted" | "rejected">("all");

  const filteredTeams = useMemo(() => {
    const term = search.toLowerCase();

    return teams.filter((team) => {
      const matchesSearch = !term ||
        team.teamName.toLowerCase().includes(term) ||
        team.managerName.toLowerCase().includes(term) ||
        team.status.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === "all" || team.status.toLowerCase() === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter, teams]);

  return (
    <div className="space-y-6 animate-fadeIn">
      <header className="sticky top-0 z-20 rounded-2xl border border-white/10 bg-slate-950/70 p-4 backdrop-blur-xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">IPL Fantasy Leaderboard</h1>
            <p className="text-sm text-slate-300">Last updated {minutesAgo(lastUpdated)}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge>{filteredTeams.length} teams</Badge>
            {biggestClimber ? <Badge className="border-emerald-400/30 bg-emerald-500/10">Biggest Climber: {biggestClimber}</Badge> : null}
            <Button onClick={() => window.location.reload()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
        <div className="mt-3 grid gap-2 md:grid-cols-[1fr_180px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by team, manager, or status"
              className="pl-9"
            />
          </div>
          <select
            className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-slate-100 focus:border-indigo-400 focus:outline-none"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as "all" | "accepted" | "rejected")}
          >
            <option value="all">All Statuses</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </header>

      <Podium teams={filteredTeams.slice(0, 3)} />
      <LeaderboardTable teams={filteredTeams} />
    </div>
  );
}
