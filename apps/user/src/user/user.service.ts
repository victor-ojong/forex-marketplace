import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const walletID = '123444A';

    console.log(walletID);
    const user = this.userRepo.create({
      ...createUserDto,
      walletID,
    });
    // sanitize and send user object and jwt token to clien as payload
    return await this.userRepo.save(user);
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepo.findOneBy({ email });

    return user;
  }

  async generateWalletID() {
    return [...Array(10)].map(() => Math.random().toString(36)[2]).join('');
  }
}
