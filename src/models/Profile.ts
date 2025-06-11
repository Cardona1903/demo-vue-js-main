// src/models/Profile.ts
import { User } from './User';

export interface Profile {
  id?: number;
  phone?: string;
  photo?: string;

  user?: User;                   // Relación 1:1 inversa
}