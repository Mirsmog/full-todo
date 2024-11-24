import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(dto: CreateUserDto) {
    try {
      return await this.prisma.user.create({ data: dto });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async findById(id: string) {
    try {
      return await this.prisma.user.findUnique({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async findByEmail(email: string) {
    try {
      return await this.prisma.user.findUnique({ where: { email } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async update(id: string, dto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({ where: { id }, data: dto });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async remove(id: string) {
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
