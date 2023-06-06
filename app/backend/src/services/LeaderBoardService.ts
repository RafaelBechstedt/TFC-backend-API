import { countVictories,
  countDraws,
  countLosses,
  calculateGoalsFavor,
  calculateGoalsOwn,
  getHomeMatchesByTeam } from '../utils/calculateLeaderBoard';
import { IMatch } from '../interfaces/Match';
// import { ILeaderBoard } from '../interfaces/LeaderBoard';
import MatchService from './MatchService';
import TeamService from './TeamService';

class LeaderBoardService {
  static generateLeaderBoard(matches: IMatch[], teamName: string) {
    const totalGames = matches.length;
    const totalVictories = countVictories(matches);
    const totalDraws = countDraws(matches);
    const totalLosses = countLosses(matches);
    const goalsFavor = calculateGoalsFavor(matches);
    const goalsOwn = calculateGoalsOwn(matches);
    const totalPoints = totalVictories * 3 + totalDraws;

    return {
      name: teamName,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
    };
  }

  static async getHomeInfo() {
    const teams = await TeamService.findAll();
    const matches = await MatchService.finishedMatches();

    const homeInfo = teams.map((team) => {
      const homeMatches = getHomeMatchesByTeam(team.teamName, matches);
      return this.generateLeaderBoard(homeMatches, team.teamName);
    });
    return homeInfo;
  }
}

export default LeaderBoardService;
