import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import validateLogin from '../utils/moddlewares';

const loginRouter = Router();

loginRouter.post('/', validateLogin, LoginController.login);

export default loginRouter;
