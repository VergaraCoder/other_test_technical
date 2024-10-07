import { SetMetadata } from '@nestjs/common';

export const key_roles="jesus";
export const roles = (...roles: string[]) => SetMetadata(key_roles, roles);
