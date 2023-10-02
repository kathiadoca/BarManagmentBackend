import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES } from '../../auth/application/roles.config';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // Si no se especifican roles, permitir el acceso
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Usuario validado por JWT
    return roles.includes(user.role);
  }
}
