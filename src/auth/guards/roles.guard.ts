import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../models/roles.model';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(contex: ExecutionContext) {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, contex.getHandler());
    if (!roles) {
      return true;
    }
    const request = contex.switchToHttp().getRequest();
    // ['admin']
    const user = request.user as PayloadToken;
    // { role: 'admin', sub: 1221 }
    const isAuth = roles.some((role) => user.role === role);

    if (!isAuth) {
      throw new UnauthorizedException('Your role is not authorized');
    }
    return isAuth;
  }
}
