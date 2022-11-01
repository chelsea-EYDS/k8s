import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

export type JwtPayload = { sub: number; username: string };

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const extractJwtFromCookie = (req) => {
      return req.headers['X-Auth-Request-Access-Token'];
    };

    super({
      jwtFromRequest: extractJwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: 'asydiaus8',
    });
  }

  extractJwtFromCookie(req) {
    return req.headers['X-Auth-Request-Access-Token'];
  }

  async validate(payload: JwtPayload) {
    console.log(payload, 'PAYLOAD');
    return { id: payload.sub, username: payload.username };
  }
}
