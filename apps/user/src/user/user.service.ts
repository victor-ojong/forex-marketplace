import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/user-login.dto';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return createUserDto;
  }

  async login(loginDto: LoginDto) {
    return loginDto;
  }
}
