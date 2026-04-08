"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center px-4 py-8">
      <div className="glass rounded-2xl border border-rose-300/30 p-8 text-center">
        <h1 className="text-2xl font-bold text-white">Couldn&apos;t load leaderboard</h1>
        <p className="mt-2 text-slate-300">Google Sheets may be unavailable. Please try again.</p>
        <Button className="mt-6" onClick={() => reset()}>
          Retry
        </Button>
      </div>
    </main>
  );
}
