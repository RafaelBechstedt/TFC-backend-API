import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

class TeamController {
  static async findAll(_req: Request, res: Response) {
    const teams = await TeamService.findAll();
    return res.status(200).json(teams);
  }
}

export default TeamController;