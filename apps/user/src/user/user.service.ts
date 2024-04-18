import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/user-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto = await this.authService.createAccount(createUserDto);

    const walletID = await this.generateWalletID();

    const user = this.userRepo.create({
      ...createUserDto,
      walletID,
    });
    // sanitize and send user object and jwt token to clien as payload
    return await this.userRepo.save(user);
  }

  async login(loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  async findOneByEmail(email: string) {
    return await this.userRepo.findOneBy({ email });
  }

  async generateWalletID() {
    return [...Array(10)].map(() => Math.random().toString(36)[2]).join('');
  }
}
