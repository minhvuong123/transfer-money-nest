import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { Services } from 'src/utils/constants';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/utils/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      provide: Services.USERS,
      useClass: UserService,
    },
  ],
  exports: [Services.USERS],
})
export class UserModule {}
