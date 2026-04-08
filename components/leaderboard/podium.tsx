import Link from "next/link";
import { Crown } from "lucide-react";
import { RankedTeam } from "@/lib/types";
import { Card } from "@/components/ui/card";

const podiumConfig = [
  {
    idx: 0,
    outerOrder: "order-1 md:order-2",
    className: "md:-mt-6 border-amber-300/40",
    glow: "from-amber-300/30"
  },
  {
    idx: 1,
    outerOrder: "order-2 md:order-1",
    className: "border-slate-300/30",
    glow: "from-slate-300/20"
  },
  {
    idx: 2,
    outerOrder: "order-3 md:order-3",
    className: "border-orange-400/30",
    glow: "from-orange-400/20"
  }
];

export function Podium({ teams }: { teams: RankedTeam[] }) {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {podiumConfig.map(({ idx, outerOrder, className, glow }) => {
        const team = teams[idx];
        if (!team) return null;

        return (
          <Link key={team.id} href={`/team/${team.id}`} className={outerOrder}>
            <Card
              className={`relative overflow-hidden border p-5 transition duration-300 hover:scale-[1.01] hover:shadow-glow ${className} ${idx === 0 ? "animate-float" : ""}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${glow} to-transparent`} />
              <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-slate-300">Rank #{team.rank}</span>
                  {idx === 0 && <Crown className="h-5 w-5 text-amber-300" />}
                </div>
                <h3 className="text-lg font-semibold text-white">{team.teamName}</h3>
                <p className="text-sm text-slate-300">{team.managerName}</p>
                <p className="text-2xl font-bold text-white">{team.points} pts</p>
              </div>
            </Card>
          </Link>
        );
      })}
    </section>
  );
}
