import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from './roles.guard';

/**
 * Decorator to set required roles for a route
 * @param roles Array of role names required for access
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles); 