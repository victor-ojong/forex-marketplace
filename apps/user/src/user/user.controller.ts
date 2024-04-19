import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/user-login.dto';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userservice: UserService,
  ) {}

  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('/find/:email')
  async findOne(@Param('email') email: string) {
    return await this.userservice.findOneByEmail(email);
  }
}
