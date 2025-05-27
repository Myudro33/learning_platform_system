import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateSubmissionDto {
  @IsString()
  @IsNotEmpty()
  grade: string;
}
