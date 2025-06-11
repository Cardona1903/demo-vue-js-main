// src/models/Role.ts
import { Permission } from './Permission';
import { RolePermission } from './RolePermission';
import { User } from './User';
import { UserRole } from './UserRole';

export interface Role {
  id?: number;
  name?: string;
  description?: string;

  users?: User[];                // Relación M:N inversa
  userRoles?: UserRole[];        // Relación M:N a través de UserRole
  permissions?: Permission[];    // Relación M:N (acceso directo)
  rolePermissions?: RolePermission[]; // Relación M:N a través de RolePermission
}