import Link from "next/link";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { RankedTeam } from "@/lib/types";
import { cn } from "@/lib/utils";

function TrendIcon({ trend }: { trend: RankedTeam["trend"] }) {
  if (trend === "up") return <ArrowUp className="h-4 w-4 text-emerald-400" />;
  if (trend === "down") return <ArrowDown className="h-4 w-4 text-rose-400" />;
  return <Minus className="h-4 w-4 text-slate-300" />;
}

export function LeaderboardTable({ teams }: { teams: RankedTeam[] }) {
  return (
    <div className="glass overflow-hidden rounded-2xl border border-white/10">
      <table className="hidden w-full text-left md:table">
        <thead className="bg-white/5 text-xs uppercase tracking-widest text-slate-300">
          <tr>
            <th className="px-6 py-4">Rank</th>
            <th className="px-6 py-4">Team Name</th>
            <th className="px-6 py-4">Manager</th>
            <th className="px-6 py-4">Points</th>
            <th className="px-6 py-4">Trend</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id} className="border-t border-white/10 transition hover:bg-white/5">
              <td className="px-6 py-4 font-semibold text-white">#{team.rank}</td>
              <td className="px-6 py-4">
                <Link href={`/team/${team.id}`} className="font-medium text-slate-100 hover:text-indigo-300">
                  {team.teamName}
                </Link>
              </td>
              <td className="px-6 py-4 text-slate-300">{team.managerName}</td>
              <td className="px-6 py-4 text-white">{team.points}</td>
              <td className="px-6 py-4">
                <TrendIcon trend={team.trend} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="grid gap-3 p-3 md:hidden">
        {teams.map((team) => (
          <Link
            key={team.id}
            href={`/team/${team.id}`}
            className={cn(
              "rounded-2xl border border-white/10 bg-white/5 p-4 transition",
              "hover:border-indigo-300/40 hover:bg-white/10"
            )}
          >
            <div className="mb-2 flex items-center justify-between text-xs uppercase text-slate-400">
              <span>Rank #{team.rank}</span>
              <TrendIcon trend={team.trend} />
            </div>
            <p className="font-semibold text-white">{team.teamName}</p>
            <p className="text-sm text-slate-300">{team.managerName}</p>
            <p className="mt-2 text-lg font-bold text-white">{team.points} pts</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
