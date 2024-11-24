import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    example: 'My first todo',
    required: true,
    maxLength: 512,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(512)
  body: string;

  @ApiProperty({
    example: 'uuid',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
