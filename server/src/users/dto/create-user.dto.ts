import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Jonh12',
    minLength: 4,
    maxLength: 16,
    required: true,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(16)
  name: string;

  @ApiProperty({
    example: 'john12@gmail.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    minLength: 6,
    maxLength: 32,
    required: true,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  password: string;
}
