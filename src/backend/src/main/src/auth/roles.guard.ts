import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';

// Decorator metadata key
export const ROLES_KEY = 'roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get required roles from route handler metadata
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no roles are required, allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // Get user from request
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // If no user or userRecord, deny access
    if (!user || !user.userRecord) {
      return false;
    }

    // Check if user has any of the required roles
    for (const role of requiredRoles) {
      const hasRole = await this.authService.hasRole(user.userRecord, role);
      if (hasRole) {
        return true;
      }
    }

    return false;
  }
} 