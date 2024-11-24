import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(userId: string, dto: CreateTodoDto) {
    try {
      const data = { userId, ...dto };
      return await this.prisma.todo.create({ data });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async findById(id: string) {
    try {
      return await this.prisma.todo.findUnique({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async findAllByUserId(userId: string) {
    try {
      return await this.prisma.todo.findMany({ where: { userId } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async update(id: string, dto: UpdateTodoDto) {
    try {
      return await this.prisma.todo.update({ where: { id }, data: dto });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async remove(id: string) {
    try {
      return await this.prisma.todo.delete({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
