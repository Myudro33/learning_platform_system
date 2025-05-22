import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLectureDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  content: string;
  @IsString()
  @IsNotEmpty()
  videoUrl: string;
}
