import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';

import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from '../user/dto/user-login.dto';

export const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async createAccount(createAccountDto: CreateUserDto) {
    const userExist = await this.userService.findOneByEmail(
      createAccountDto.email,
    );

    if (userExist) {
      throw new HttpException('email already in use on our platform', 403);
    }
    const salt = randomBytes(8).toString('hex');

    const hash = (await scrypt(createAccountDto.password, salt, 32)) as Buffer;

    createAccountDto.password = salt + '.' + hash.toString('hex');

    return createAccountDto;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findOneByEmail(loginDto.email);
    const currentUser = user;

    if (!currentUser) {
      throw new HttpException('Invalid login credentials', 403);
    }

    const [salt, hashedDB] = currentUser.password.split('.');

    const newHash = (await scrypt(loginDto.password, salt, 32)) as Buffer;

    const isValid =
      hashedDB === newHash.toString('hex').slice(0, hashedDB.length);

    if (!isValid) {
      throw new HttpException('Invalid login credentials', 403);
    }
    // sanitize user and send jwt token and user object to client
    currentUser.password = undefined;
    return currentUser;
  }
}
