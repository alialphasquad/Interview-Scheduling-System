import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService:UsersService, private jwtService: JwtService){}

  async signup(username:string,email:string,password:string) {
    return await this.usersService.create({username,email,password});
  }

  async signin({
    email,
    username,
    firstname,
    lastname
  }) {
    const payload = {
      email,
      username,
      firstname,
      lastname
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    let user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException(
        'User with the given email/username does not exist.',
      );
    }
    let comparePass: any = await bcrypt.compareSync(password, user.password);
    if (comparePass) {
      return user;
    }
    return null;
  }
}
