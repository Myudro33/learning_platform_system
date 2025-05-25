import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ example: 'course title' })
  @IsString()
  @IsNotEmpty()
  title: string;
  @ApiProperty({ example: 'course description' })
  @IsString()
  @IsOptional()
  description: string;
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  createdBy: number;
}
