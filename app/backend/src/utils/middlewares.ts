import { NextFunction, Request, Response } from 'express';
import Token from './token';

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password: string): boolean => password.length >= 6;

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  const isEmailValid = isValidEmail(email);
  const isPasswordValid = isValidPassword(password);
  if (!isEmailValid || !isPasswordValid) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
};

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    Token.validateToken(authorization);
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  next();
};

const validateCreateMatch = (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    return res.status(422).json({
      message: 'It is not possible to create a match with two equal teams' });
  }

  next();
};

export default { validateLogin, validateToken, validateCreateMatch };
