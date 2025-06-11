// src/models/Address.ts
import { User } from './User';

export interface Address {
  id?: number;
  street?: string;
  number?: string;
  latitude?: number;
  longitude?: number;

  user?: User;                   // Relación 1:1 inversa
}