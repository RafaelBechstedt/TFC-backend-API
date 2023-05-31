import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const configJWT: jwt.SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

interface ITokenPayload{
  email: string,
  role: string
}

class Token {
  static generateToken(payload: ITokenPayload) {
    const token = jwt.sign(payload, secret, configJWT);
    return token;
  }

  static validateToken(token: string) {
    const payload = jwt.verify(token, secret);
    return payload;
  }
}

export default Token;
