import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { UserService } from './user.service';
import { JwtGuard, AdminGuard } from '../auth/guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@UseGuards(JwtGuard)
@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(AdminGuard)
  @Get('')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get users' })
  @ApiResponse({ status: 200, description: 'List of users returned' })
  getUsers() {
    return this.userService.getUsers();
  }
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get user info' })
  @ApiResponse({ status: 200, description: 'user info fetched' })
  @Get('me')
  profile(@GetUser() user: User) {
    return { data: user };
  }
}
