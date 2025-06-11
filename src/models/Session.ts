// src/models/Session.ts
import { User } from './User';

export interface Session {
  id?: string;
  token?: string;
  expiration?: Date;
  FACode?: string;
  state?: string;

  user?: User;                   // Relación Many-to-One
}