import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

class MatchController {
  static async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress === 'true') {
      const matchesInProgress = await MatchService.inProgress();
      return res.status(200).json(matchesInProgress);
    }

    if (inProgress === 'false') {
      const finishedMatches = await MatchService.finishedMatches();
      return res.status(200).json(finishedMatches);
    }
    const matches = await MatchService.findAll();
    return res.status(200).json(matches);
  }

  public static async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    await MatchService.finishMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }

  public static async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await MatchService.updateMatch(Number(homeTeamGoals), Number(awayTeamGoals), Number(id));
    return res.status(200).json({ message: 'updated match' });
  }

  static async createMatch(req: Request, res: Response) {
    const createdData = req.body;
    const newMatch = await MatchService.createMatch(createdData);
    if (newMatch === undefined) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    return res.status(201).json(newMatch);
  }
}
export default MatchController;
