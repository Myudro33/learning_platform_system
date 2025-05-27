import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSubmissionDto {
  @ApiProperty({ example: '5' })
  @IsString()
  @IsNotEmpty()
  grade: string;
}
