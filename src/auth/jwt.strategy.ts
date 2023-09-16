import { Injectable } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private moduleRef: ModuleRef) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET',
      passReqToCallback: true,
    });
  }
  async validate(request: Request, payload: any) {

    const contextId = ContextIdFactory.getByRequest(request);
    const usersService = await this.moduleRef.resolve(UsersService, contextId);
    const user = usersService.findOne(payload.sub);
    return user;
  }
}
