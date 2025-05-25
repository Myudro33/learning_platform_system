import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFileDto {
  @IsString()
  @IsNotEmpty()
  filename: string;
  @IsString()
  @IsNotEmpty()
  lectureId: string;
}
