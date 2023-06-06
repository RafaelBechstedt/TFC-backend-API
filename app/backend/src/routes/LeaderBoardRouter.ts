import express = require('express');
import LeaderBoardController from '../controllers/LeaderBoardController';

const leaderBoardRouter = express.Router();

leaderBoardRouter.get('/home', LeaderBoardController.getHomeInfo);

export default leaderBoardRouter;
