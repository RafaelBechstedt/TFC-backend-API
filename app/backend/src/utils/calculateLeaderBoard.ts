import { IMatch } from '../interfaces/Match';

export function getHomeMatchesByTeam(teamName: string, matches: IMatch[]) {
  return matches.filter((match) => match.homeTeam.teamName === teamName);
}

export function countVictories(matches: IMatch[]): number {
  return matches.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
}

export function countDraws(matches: IMatch[]): number {
  return matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
}

export function countLosses(matches: IMatch[]): number {
  return matches.filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
}

export function calculateGoalsFavor(matches: IMatch[]): number {
  return matches.reduce((sum, match) => sum + match.homeTeamGoals, 0);
}

export function calculateGoalsOwn(matches: IMatch[]): number {
  return matches.reduce((sum, match) => sum + match.awayTeamGoals, 0);
}
