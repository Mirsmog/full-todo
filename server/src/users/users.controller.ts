import { Controller, Get, Body, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Authorized } from '@/auth/decorators/authorized.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  profile(@Authorized('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch()
  update(@Authorized('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete()
  remove(@Authorized('id') id: string) {
    return this.usersService.remove(id);
  }
}
