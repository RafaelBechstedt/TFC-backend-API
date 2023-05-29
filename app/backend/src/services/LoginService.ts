import { compareSync } from 'bcryptjs';
import User from '../database/models/UserModel';
import Token from '../utils/toekn';

class LoginService {
  static async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user || !compareSync(password, user.password)) {
      return undefined;
    }
    const token = Token.generateToken(email);
    return token;
  }
}

export default LoginService;
