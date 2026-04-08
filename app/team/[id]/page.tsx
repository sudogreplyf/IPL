import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { Team } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface TeamsResponse {
  data: Team[];
  lastUpdated: string;
}

async function getTeams(): Promise<TeamsResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/teams`, { next: { revalidate: 60 } });

  if (!response.ok) {
    throw new Error("Failed to load teams.");
  }

  return response.json();
}

export default async function TeamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const teamsPayload = await getTeams();
  const team = teamsPayload.data.find((entry) => entry.id === id);

  if (!team) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 md:px-6">
      <Card className="space-y-6 p-6 md:p-8">
        <Link href="/">
          <Button className="bg-transparent">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to leaderboard
          </Button>
        </Link>

        <div>
          <p className="text-xs uppercase tracking-widest text-slate-300">Team</p>
          <h1 className="text-3xl font-bold text-white">{team.teamName}</h1>
        </div>

        <dl className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-widest text-slate-400">Manager</dt>
            <dd className="text-lg text-white">{team.managerName}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-slate-400">Total Points</dt>
            <dd className="text-lg font-semibold text-white">{team.points}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs uppercase tracking-widest text-slate-400">Team Link</dt>
            <dd>
              <a
                href={team.teamLink}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex items-center text-indigo-300 hover:text-indigo-200"
              >
                View external team page
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </dd>
          </div>
        </dl>
      </Card>
    </main>
  );
}
