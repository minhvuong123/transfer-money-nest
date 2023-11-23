import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { Services } from 'src/utils/constants';
import { AuthService } from './auth.service';
import { LocalStrategy } from './utils/localStrategy';
import { SessionSerializer } from './utils/sessionSerializer';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    {
      provide: Services.AUTH,
      useClass: AuthService,
    },
    LocalStrategy,
    SessionSerializer,
  ],
})
export class AuthModule {}
