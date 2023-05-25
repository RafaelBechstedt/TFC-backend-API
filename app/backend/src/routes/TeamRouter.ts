import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamRouter = Router();

teamRouter.get('/', TeamController.findAll);
teamRouter.get('/:id', TeamController.findById);

export default teamRouter;
