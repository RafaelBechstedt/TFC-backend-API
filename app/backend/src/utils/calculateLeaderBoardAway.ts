import { IMatch } from '../interfaces/Match';

export function getAwayMatchesByTeam(teamName: string, matches: IMatch[]) {
  return matches.filter((match) => match.awayTeam.teamName === teamName);
}

export function countVictories(matches: IMatch[]): number {
  return matches.filter((match) => match.awayTeamGoals > match.homeTeamGoals).length;
}

export function countDraws(matches: IMatch[]): number {
  return matches.filter((match) => match.awayTeamGoals === match.homeTeamGoals).length;
}

export function countLosses(matches: IMatch[]): number {
  return matches.filter((match) => match.awayTeamGoals < match.homeTeamGoals).length;
}

export function calculateGoalsFavor(matches: IMatch[]): number {
  return matches.reduce((sum, match) => sum + match.awayTeamGoals, 0);
}

export function calculateGoalsOwn(matches: IMatch[]): number {
  return matches.reduce((sum, match) => sum + match.homeTeamGoals, 0);
}

export function calculateGoalsBalance(matches: IMatch[]): number {
  return matches.reduce((balance, match) => balance + match.awayTeamGoals - match.homeTeamGoals, 0);
}

export function calculateEfficiency(matches: IMatch[]): number {
  const totalPoints = countVictories(matches) * 3 + countDraws(matches);
  const totalGames = matches.length;

  const efficiency = (totalPoints / (totalGames * 3)) * 100;
  return Number(efficiency.toFixed(2));
}
