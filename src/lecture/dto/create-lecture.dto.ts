import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLectureDto {
  @ApiProperty({ example: 'lecture title' })
  @IsString()
  @IsNotEmpty()
  title: string;
  @ApiProperty({ example: 'lecture content' })
  @IsString()
  @IsNotEmpty()
  content: string;
  @ApiProperty({ example: 'video url' })
  @IsString()
  @IsNotEmpty()
  videoUrl: string;
}
