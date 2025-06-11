// src/models/UserRole.ts
import { Role } from './Role';
import { User } from './User';

export interface UserRole {
  id?: string;
  startAt?: Date;
  endAt?: Date;

  user?: User;                   // Relación Many-to-One
  role?: Role;                   // Relación Many-to-One
}