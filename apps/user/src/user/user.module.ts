import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '@app/common';

@Module({
  controllers: [DatabaseModule, UserController],
  providers: [UserService],
})
export class UserModule {}
