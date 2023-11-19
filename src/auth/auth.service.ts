import { Inject, Injectable } from '@nestjs/common';
import { IAuthService } from './auth';
import { Services } from 'src/utils/constants';
import { IUserService } from 'src/user/user';
import { User } from 'src/utils/typeorm';
import { CreateUserParams } from 'src/utils/types/queries';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}

  validateUser() {}
  registerUser(params: CreateUserParams): Promise<User> {
    return this.userService.createUser(params);
  }
}
