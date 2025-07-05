import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/User.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userRepo.findOneBy({ username });
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(user: User) {
    const payload = { sub: user.id, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
