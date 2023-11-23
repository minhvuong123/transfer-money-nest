import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IAuthService } from './auth';
import { RegisterUserDto } from './dtos/regsiterUser.dto';
import { instanceToPlain } from 'class-transformer';
import { LocalAuthenGuard } from './utils/gaurds';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private readonly authService: IAuthService,
  ) {}

  @Post('register')
  async register(@Body() registerUserPayload: RegisterUserDto) {
    return instanceToPlain(
      await this.authService.registerUser(registerUserPayload),
    );
  }

  @Post('login')
  @UseGuards(LocalAuthenGuard)
  async login() {
    return 'OK';
  }
}
