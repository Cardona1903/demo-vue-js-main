// src/models/Password.ts
import { User } from './User';

export interface Password {
  id?: number;
  content?: string;
  startAt?: Date;
  endAt?: Date;

  user?: User;                   // Relación Many-to-One
}