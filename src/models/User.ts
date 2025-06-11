// src/models/User.ts
import { Profile } from './Profile';
import { Address } from './Address';
import { Password } from './Password';
import { Session } from './Session';
import { Role } from './Role';
import { UserRole } from './UserRole';

export interface User {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  is_active?: boolean;

  profile?: Profile;              // Relación 1:1
  address?: Address;              // Relación 1:1
  passwords?: Password[];         // Relación 1:N
  sessions?: Session[];           // Relación 1:N
  userRoles?: UserRole[];         // Relación M:N a través de UserRole
  roles?: Role[];                 // Relación M:N (acceso directo a roles)
}