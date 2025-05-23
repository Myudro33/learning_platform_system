import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  roleId: string;
  @IsString()
  @IsOptional()
  avatar: string;
}
