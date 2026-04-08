import Link from "next/link";

export default function TeamNotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center px-4 py-8">
      <div className="glass rounded-2xl border border-white/10 p-8 text-center">
        <h1 className="text-2xl font-bold text-white">Team not found</h1>
        <p className="mt-2 text-slate-300">The requested team id does not exist in the current sheet.</p>
        <Link href="/" className="mt-5 inline-block text-indigo-300 hover:text-indigo-200">
          Return to leaderboard
        </Link>
      </div>
    </main>
  );
}
