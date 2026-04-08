import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTrend(index: number): "up" | "down" | "same" {
  if (index % 3 === 0) return "up";
  if (index % 2 === 0) return "same";
  return "down";
}

export function minutesAgo(timestamp: string): string {
  const then = new Date(timestamp).getTime();
  const diffMs = Date.now() - then;
  const mins = Math.max(0, Math.floor(diffMs / 60000));
  if (mins < 1) return "just now";
  if (mins === 1) return "1 min ago";
  return `${mins} mins ago`;
}
