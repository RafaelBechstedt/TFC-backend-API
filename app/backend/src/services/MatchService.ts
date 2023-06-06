import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';

interface ICreatedMatch {
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

class MatchService {
  static async findAll() {
    const matches = await Match.findAll({
      include: [
        {
          model: Team,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: Team,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    console.log(matches);
    return matches;
  }

  public static async inProgress() {
    const matches = await this.findAll();
    const inProgress = matches.filter((match) => match.dataValues.inProgress === true);
    return inProgress;
  }

  static async finishedMatches() {
    const matches = await this.findAll();
    const finished = matches.filter((match) => match.dataValues.inProgress === false);
    return finished;
  }

  public static async finishMatch(id: number) {
    const matches = await Match.update({ inProgress: false }, { where: { id } });
    return matches;
  }

  public static async updateMatch(homeTeamGoals: number, awayTeamGoals: number, id: number) {
    await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  static async createMatch(createdData: ICreatedMatch) {
    const { homeTeamId, awayTeamId } = createdData;

    const homeTeam = await Team.findByPk(homeTeamId);
    const awayTeam = await Team.findByPk(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return undefined;
    }

    const newMatch = await Match.create({ ...createdData, inProgress: true });

    return newMatch;
  }
}

export default MatchService;
