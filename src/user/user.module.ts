import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { Services } from 'src/utils/constants';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    {
      provide: Services.USERS,
      useClass: UserService,
    },
  ],
})
export class UserModule {}
