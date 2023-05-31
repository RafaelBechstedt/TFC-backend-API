import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await LoginService.login(email, password);
    if (token) {
      return res.status(200).json({ token });
    }
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  static async getRole(req: Request, res: Response) {
    const { email } = req.body;
    const role = await LoginService.getRole(email);
    return res.status(200).json({ role });
  }
}

export default LoginController;
