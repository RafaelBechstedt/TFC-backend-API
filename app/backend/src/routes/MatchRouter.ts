import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import middlewares from '../utils/middlewares';

const matchRouter = Router();

matchRouter.get('/', MatchController.getAllMatches);
matchRouter.patch('/:id', middlewares.validateToken, MatchController.updateMatch);
matchRouter.patch('/:id/finish', middlewares.validateToken, MatchController.finishMatch);
matchRouter.post(
  '/',
  middlewares.validateToken,
  middlewares.validateCreateMatch,
  MatchController.createMatch,
);

export default matchRouter;
