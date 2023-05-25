import { ITeam } from '../interfaces/Team';
import Team from '../database/models/TeamModel';

class TeamService {
  static async findAll(): Promise<ITeam[]> {
    const teams = await Team.findAll();
    return teams;
  }
}

export default TeamService;
