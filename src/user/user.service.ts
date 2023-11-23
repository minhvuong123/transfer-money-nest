import { Injectable } from '@nestjs/common';
import { IUserService } from './user';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import {
  CreateUserParams,
  FindUserOptions,
  FindUserParams,
} from 'src/utils/types/queries';
import { UserFoundException } from './exceptions/UserFoundException';
import { hasPassword } from 'src/utils/helpers';
import { getUserSelectors } from 'src/utils/constants';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findUser(params: FindUserParams, options?: FindUserOptions): Promise<User> {
    const select = getUserSelectors(options?.selectPassword);
    return this.userRepository.findOne({ where: params, select });
  }

  async createUser(params: CreateUserParams) {
    const existingUser = await this.findUser({ username: params.username });

    if (existingUser) {
      throw new UserFoundException();
    }
    params.password = await hasPassword(params.password);

    const newUser = this.userRepository.create(params);

    return this.userRepository.save(newUser);
  }
}
