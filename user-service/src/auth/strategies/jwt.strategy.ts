import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy,'jwt' ) {
  constructor(
    private readonly configService: ConfigService
   ) {
    super({
        jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: configService.get('JWT_SECRET'),
        ignoreExpiration: false
    });
  }

  async validate( payload: any ) {
    return { userId: payload.sub, email: payload.email };
    //
  }
}