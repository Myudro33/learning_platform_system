import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class InstructorGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      return false;
    }
    if (user.roleId === 2 || user.roleId === 1) {
      return true;
    } else {
      throw new ForbiddenException('only instructor can access this resource');
    }
  }
}
