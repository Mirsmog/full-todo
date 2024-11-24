import { Module } from '@nestjs/common';
import { UsersService } from '@/users/users.service';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
