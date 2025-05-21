import { Body, Controller, Post } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { SingInDto } from './dto/signin-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signUp(@Body() dto: CreateAuthDto) {
    return this.authService.signUp(dto);
  }
  @Post('signin')
  singIn(@Body() dto: SingInDto) {
    return this.authService.signIn(dto);
  }
}
