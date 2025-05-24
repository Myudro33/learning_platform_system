import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { UserService } from './user.service';
import { JwtGuard, AdminGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(AdminGuard)
  @Get('')
  getUsers() {
    return this.userService.getUsers();
  }
  @UseGuards(JwtGuard)
  @Get('me')
  profile(@GetUser() user: User) {
    return { data: user };
  }
}
