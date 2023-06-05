import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';

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
    return matches;
  }
}

export default MatchService;
