// src/models/RolePermission.ts
import { Permission } from './Permission';
import { Role } from './Role';

export interface RolePermission {
  id?: string;
  startAt?: Date;
  endAt?: Date;

  role?: Role;                   // Relación Many-to-One
  permission?: Permission;       // Relación Many-to-One
}