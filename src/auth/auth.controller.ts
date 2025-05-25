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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  @ApiOperation({ summary: 'register user' })
  @ApiResponse({ status: 201, description: 'user created ' })
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
  @ApiOperation({ summary: 'sign in' })
  @ApiResponse({ status: 200, description: 'user signed in' })
  singIn(@Body() dto: SingInDto) {
    return this.authService.signIn(dto);
  }
}
