export type TeamStatus = "Accepted" | "Rejected" | string;

export interface Team {
  id: string;
  managerName: string;
  teamName: string;
  teamLink: string;
  status: TeamStatus;
  points: number;
}

export interface RankedTeam extends Team {
  rank: number;
  trend: "up" | "down" | "same";
}
