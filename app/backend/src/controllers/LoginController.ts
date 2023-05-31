import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import Token from '../utils/token';

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
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const decodedToken = Token.decodeToken(authorization);
    let email = null;
    if (typeof decodedToken === 'string' || decodedToken === null) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    email = decodedToken.email;

    const role = await LoginService.getRole(email);
    return res.status(200).json({ role });
  }
  // static async getRole(req: Request, res: Response) {
  //   const { authorization } = req.headers;
  //   if (!authorization) {
  //     throw new Error();
  //   }
  //   const decodedToken = Token.decodeToken(authorization);
  //   const role = await LoginService.getRole(email);
  //   return res.status(200).json({ role });
  // }
}

export default LoginController;
