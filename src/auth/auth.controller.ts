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
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  @ApiOperation({ summary: 'register user' })
  @ApiResponse({ status: 201, description: 'user created ' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', default: 'john' },
        email: { type: 'string', default: 'john@gmail.com' },
        password: { type: 'string', default: 'john123' },
        roleId: { type: 'string', default: '3' },
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
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
