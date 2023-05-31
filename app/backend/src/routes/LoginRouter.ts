import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import { validateLogin, validateToken } from '../utils/middlewares';

const loginRouter = Router();

loginRouter.post('/', validateLogin, LoginController.login);
loginRouter.get('/role', validateToken, LoginController.getRole);

export default loginRouter;
