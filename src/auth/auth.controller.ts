import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { SingInDto } from './dto/signin-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploadService } from 'src/file-upload/file-upload.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  @UseInterceptors(
    FileInterceptor(
      'avatar',
      new ImageUploadService().getMulterOptions('avatar'),
    ),
  )
  signUp(
    @Body() dto: CreateAuthDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return this.authService.signUp(dto, avatar);
  }
  @Post('signin')
  singIn(@Body() dto: SingInDto) {
    return this.authService.signIn(dto);
  }
}
