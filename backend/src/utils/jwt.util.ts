import * as jwt from 'jsonwebtoken';

export interface JwtPayload {
  id: string;
  [key: string]: any;
}

export function signJwt(
  payload: object,
  secretKey: string,
  options?: jwt.SignOptions,
): string {
  return jwt.sign(payload, secretKey, options);
}

export function verifyJwt(token: string, secretKey: string): JwtPayload {
  try {
    return jwt.verify(token, secretKey) as JwtPayload;
  } catch {
    throw new Error('Invalid token');
  }
}
