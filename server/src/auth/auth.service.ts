import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '@/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  public async validate(email: string, password: string) {
    const existingUser = await this.userService.findByEmail(email);
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    const isPassMatch = await bcrypt.compare(password, existingUser.password);
    if (!isPassMatch) {
      throw new UnauthorizedException('Password does not match');
    }
    return existingUser;
  }
}
