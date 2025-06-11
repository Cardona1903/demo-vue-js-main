// src/models/Permission.ts
import { Role } from './Role';
import { RolePermission } from './RolePermission';

export interface Permission {
  id?: number;
  url?: string;
  method?: string;
  entity?: string;               // Nuevo atributo para identificar la entidad

  roles?: Role[];                // Relación M:N inversa
  rolePermissions?: RolePermission[]; // Relación M:N a través de RolePermission
}