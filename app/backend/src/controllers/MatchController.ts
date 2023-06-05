import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

class MatchController {
  static async getAllMatches(_req: Request, res: Response) {
    const matches = await MatchService.findAll();
    return res.status(200).json(matches);
  }
}
export default MatchController;
