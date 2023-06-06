import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import middlewares from '../utils/middlewares';

const loginRouter = Router();

loginRouter.post('/', middlewares.validateLogin, LoginController.login);
loginRouter.get('/role', LoginController.getRole);

export default loginRouter;
