import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAssignmentDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsOptional()
  description: string;
  @IsString()
  @IsNotEmpty()
  dueDate: string;
}
