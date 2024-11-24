import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Authorized } from '@/auth/decorators/authorized.decorator';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Authorized('id') userId: string, @Body() dto: CreateTodoDto) {
    return this.todosService.create(userId, dto);
  }

  @Get()
  findAll(@Authorized('id') userId: string) {
    return this.todosService.findAllByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
    return this.todosService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(id);
  }
}
