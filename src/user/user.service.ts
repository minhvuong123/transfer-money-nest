import { Injectable } from '@nestjs/common';
import { IUserService } from './user';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { CreateUserParams, FindUserParams } from 'src/utils/types/queries';
import { UserFoundException } from './exceptions/UserFoundException';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findUser(params: FindUserParams): Promise<User> {
    return this.userRepository.findOneBy(params);
  }

  async createUser(params: CreateUserParams) {
    const existingUser = await this.findUser({ username: params.username });

    if (existingUser) {
      throw new UserFoundException();
    }

    const newUser = this.userRepository.create(params);

    return this.userRepository.save(newUser);
  }
}
