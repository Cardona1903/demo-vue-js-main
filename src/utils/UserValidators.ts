// src/validators/UserValidator.ts

import { z } from "zod"
import { User } from "@/models/User"

export class UserValidator {
  private static schema = z.object({
    name: z.string()
      .min(3, "El nombre debe tener al menos 3 caracteres.")
      .max(100, "El nombre no puede superar los 100 caracteres."),
      
    email: z.string()
      .email("Correo inválido.")
      .max(255, "El correo no debe superar los 255 caracteres."),
      
    password: z.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres.")
      .max(100, "La contraseña no debe superar los 100 caracteres."),
      
    is_active: z.boolean().optional()
  });

  // Valida todos los campos al mismo tiempo
  static validateAll(data: Partial<User>) {
    return this.schema.safeParse(data)
  }

  // Valida un solo campo
  static validateField<K extends keyof User>(field: K, value: any) {
    const fieldSchema = this.schema.pick({ [field]: true } as any)
    return fieldSchema.safeParse({ [field]: value })
  }
}
