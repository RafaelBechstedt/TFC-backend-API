import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import validateLogin from '../utils/middlewares';

const loginRouter = Router();

loginRouter.post('/', validateLogin, LoginController.login);
loginRouter.get('/role', LoginController.getRole);

export default loginRouter;
