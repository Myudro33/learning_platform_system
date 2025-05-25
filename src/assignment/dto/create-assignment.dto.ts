import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAssignmentDto {
  @ApiProperty({ example: 'assignment title' })
  @IsString()
  @IsNotEmpty()
  title: string;
  @ApiProperty({ example: 'assignment description' })
  @IsString()
  @IsOptional()
  description: string;
  @ApiProperty({ example: '12/12/2025' })
  @IsString()
  @IsNotEmpty()
  dueDate: string;
}
