import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({ example: 'john' })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ example: 'john@gmail.com' })
  @IsString()
  @IsNotEmpty()
  email: string;
  @ApiProperty({ example: 'john123' })
  @IsString()
  @IsNotEmpty()
  password: string;
  @ApiProperty({ example: 3 })
  @IsString()
  @IsNotEmpty()
  roleId: string;
  @IsString()
  @IsOptional()
  avatar: string;
}
