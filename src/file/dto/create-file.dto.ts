import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFileDto {
  @ApiProperty({ example: '1' })
  @IsString()
  @IsNotEmpty()
  lectureId: string;
}
