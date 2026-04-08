import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none",
        className
      )}
      {...props}
    />
  );
}
