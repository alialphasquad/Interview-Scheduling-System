import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() username:string, @Body() email:string, @Body() password:string) {
    return this.authService.signup(username,email,password);
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async login(@Req() req) {
    return this.authService.signin(req.user);
  }

}
