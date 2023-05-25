import { ITeam } from '../interfaces/Team';
import Team from '../database/models/TeamModel';

class TeamService {
  static async findAll(): Promise<ITeam[]> {
    const teams = await Team.findAll();
    return teams;
  }

  static async findById(id: number): Promise<ITeam | null> {
    const team = await Team.findByPk(id);
    return team;
  }
}

export default TeamService;
