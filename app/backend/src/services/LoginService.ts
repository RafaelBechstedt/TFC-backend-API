import { compareSync } from 'bcryptjs';
import User from '../database/models/UserModel';
import Token from '../utils/token';

class LoginService {
  static async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user || !compareSync(password, user.password)) {
      return undefined;
    }
    const { role } = user;
    const token = Token.generateToken({ email, role });
    return token;
  }

  static async getRole(email: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return undefined;
    }
    const role = user?.role;
    return role;
  }
}

export default LoginService;
