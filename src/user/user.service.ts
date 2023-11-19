import { Injectable } from '@nestjs/common';
import { IUserService } from './user';

@Injectable()
export class UserService implements IUserService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  createUser() {}
}
