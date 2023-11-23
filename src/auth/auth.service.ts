import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAuthService } from './auth';
import { Services } from 'src/utils/constants';
import { IUserService } from 'src/user/user';
import { User } from 'src/utils/typeorm';
import {
  CreateUserParams,
  UserCredentialsParams,
} from 'src/utils/types/queries';
import { compareHash } from 'src/utils/helpers';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}

  async validateUser(params: UserCredentialsParams) {
    const user = await this.userService.findUser(
      { username: params.username },
      { selectPassword: true },
    );
    console.log(user);
    const isPasswordValid = await compareHash(params.password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Invalid Credentials', HttpStatus.FORBIDDEN);
    }

    return user;
  }
  registerUser(params: CreateUserParams): Promise<User> {
    return this.userService.createUser(params);
  }
}
