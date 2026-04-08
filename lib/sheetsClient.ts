import { Team } from "@/lib/types";

const SHEET_ID = process.env.GOOGLE_SHEET_ID ?? "1saVEcqsG-AvFat-O8-X3V_6s1EySsnZC7KIWcyT537U";
const SHEET_NAME = process.env.GOOGLE_SHEET_NAME ?? "Sheet1";

function toNumber(input: string | undefined): number {
  if (!input) return 0;
  const parsed = Number(input.replace(/[^\d.-]/g, ""));
  return Number.isNaN(parsed) ? 0 : parsed;
}

function mapRowToTeam(row: string[], index: number): Team {
  const [managerName = "", teamName = "", teamLink = "", status = "", points = "0"] = row;
  return {
    id: `${index + 1}`,
    managerName: managerName.trim(),
    teamName: teamName.trim(),
    teamLink: teamLink.trim(),
    status: status.trim() || "Pending",
    points: toNumber(points)
  };
}

function parseCsvLine(line: string): string[] {
  const cols: string[] = [];
  let cur = "";
  let inside = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"' && inside && nextChar === '"') {
      cur += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      inside = !inside;
      continue;
    }

    if (char === "," && !inside) {
      cols.push(cur);
      cur = "";
      continue;
    }

    cur += char;
  }

  cols.push(cur);
  return cols;
}

export async function fetchTeamsFromSheet(): Promise<Team[]> {
  const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_NAME)}`;

  const response = await fetch(csvUrl, {
    next: { revalidate: 60 }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch Google Sheet data (${response.status})`);
  }

  const csv = await response.text();
  const lines = csv.split(/\r?\n/).filter(Boolean);
  if (lines.length <= 1) return [];

  const rows = lines.slice(1).map(parseCsvLine);

  return rows.map(mapRowToTeam).filter((team) => team.teamName && team.managerName);
}
