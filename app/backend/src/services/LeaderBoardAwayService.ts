import { countVictories,
  countDraws,
  countLosses,
  calculateGoalsFavor,
  calculateGoalsOwn,
  getAwayMatchesByTeam,
  calculateGoalsBalance,
  calculateEfficiency } from '../utils/calculateLeaderBoardAway';
import { IMatch } from '../interfaces/Match';
import MatchService from './MatchService';
import TeamService from './TeamService';

class LeaderBoardAwayService {
  static generateLeaderBoard(matches: IMatch[], teamName: string) {
    const totalVictories = countVictories(matches);
    const totalDraws = countDraws(matches);
    return { name: teamName,
      totalGames: matches.length,
      totalVictories,
      totalDraws,
      totalLosses: countLosses(matches),
      goalsFavor: calculateGoalsFavor(matches),
      goalsOwn: calculateGoalsOwn(matches),
      totalPoints: totalVictories * 3 + totalDraws,
      goalsBalance: calculateGoalsBalance(matches),
      efficiency: calculateEfficiency(matches),
    };
  }

  static async getAwayInfo() {
    const teams = await TeamService.findAll();
    const matches = await MatchService.finishedMatches();

    const awayInfo = teams.map((team) => {
      const awayMatches = getAwayMatchesByTeam(team.teamName, matches);
      return this.generateLeaderBoard(awayMatches, team.teamName);
    });

    awayInfo.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints; // Ordenar por total de pontos (decrescente)
      } if (a.totalVictories !== b.totalVictories) {
        return b.totalVictories - a.totalVictories; // Ordenar por total de vitórias (decrescente)
      } if (a.goalsBalance !== b.goalsBalance) {
        return b.goalsBalance - a.goalsBalance; // Ordenar por saldo de gols (decrescente)
      }
      return b.goalsFavor - a.goalsFavor; // Ordenar por gols a favor (decrescente)
    });

    return awayInfo;
  }
}

export default LeaderBoardAwayService;
