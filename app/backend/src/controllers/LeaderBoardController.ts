import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

class LeaderboardController {
  static async getHomeInfo(_req: Request, res: Response) {
    const homeInfo = await LeaderBoardService.getHomeInfo();
    return res.status(200).json(homeInfo);
  }
}

export default LeaderboardController;
