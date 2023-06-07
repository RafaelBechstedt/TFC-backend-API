import LeaderBoardHomeService from './LeaderBoardHomeService';
import LeaderBoardAwayService from './LeaderBoardAwayService';

interface overallInfo {
  name: string;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  totalPoints: number;
  goalsBalance: number;
  efficiency: number;
}

class LeaderBoardOverallService {
  static async getOverallInfo() {
    const homeInfo = await LeaderBoardHomeService.getHomeInfo();
    const awayInfo = await LeaderBoardAwayService.getAwayInfo();
    const overallInfo = homeInfo.concat(awayInfo);
    const mergedInfo = this.mergeTeamStats(overallInfo);

    mergedInfo.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints; // Ordenar por total de pontos (decrescente)
      } if (a.totalVictories !== b.totalVictories) {
        return b.totalVictories - a.totalVictories; // Ordenar por total de vitórias (decrescente)
      } if (a.goalsBalance !== b.goalsBalance) {
        return b.goalsBalance - a.goalsBalance; // Ordenar por saldo de gols (decrescente)
      }
      return b.goalsFavor - a.goalsFavor; // Ordenar por gols a favor (decrescente)
    });

    return mergedInfo;
  }

  static mergeTeamStats(teams: overallInfo[]) {
    const mergedTeams: overallInfo[] = [];
    teams.forEach((team) => {
      const existingTeam = mergedTeams.find((t) => t.name === team.name);
      if (existingTeam) {
        existingTeam.totalGames += team.totalGames;
        existingTeam.totalVictories += team.totalVictories;
        existingTeam.totalDraws += team.totalDraws;
        existingTeam.totalLosses += team.totalLosses;
        existingTeam.goalsFavor += team.goalsFavor;
        existingTeam.goalsOwn += team.goalsOwn;
        existingTeam.totalPoints += team.totalPoints;
        existingTeam.goalsBalance += team.goalsBalance;
        existingTeam.efficiency = Number(((existingTeam
          .totalPoints / (existingTeam.totalGames * 3)) * 100).toFixed(2));
      } else { mergedTeams.push({ ...team }); }
    });
    return mergedTeams;
  }
}
export default LeaderBoardOverallService;
