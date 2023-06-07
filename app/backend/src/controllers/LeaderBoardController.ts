import { Request, Response } from 'express';
import LeaderBoardHomeService from '../services/LeaderBoardHomeService';
import LeaderBoardAwayService from '../services/LeaderBoardAwayService';

class LeaderboardController {
  static async getHomeInfo(_req: Request, res: Response) {
    const homeInfo = await LeaderBoardHomeService.getHomeInfo();
    return res.status(200).json(homeInfo);
  }

  static async getAwayInfo(_req: Request, res: Response) {
    const awayInfo = await LeaderBoardAwayService.getAwayInfo();
    return res.status(200).json(awayInfo);
  }
}

export default LeaderboardController;
