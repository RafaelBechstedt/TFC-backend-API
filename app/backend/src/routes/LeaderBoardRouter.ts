import express = require('express');
import LeaderBoardController from '../controllers/LeaderBoardController';

const leaderBoardRouter = express.Router();

leaderBoardRouter.get('/home', LeaderBoardController.getHomeInfo);
leaderBoardRouter.get('/away', LeaderBoardController.getAwayInfo);

export default leaderBoardRouter;
