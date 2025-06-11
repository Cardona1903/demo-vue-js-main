// src/validators/RoleValidator.ts

import { z } from "zod";
import { Role } from "@/models/Role";

export class RoleValidator {
  private static schema = z.object({
    name: z
      .string()
      .min(3, "El nombre del rol debe tener al menos 3 caracteres.")
      .max(50, "El nombre del rol no debe superar los 50 caracteres."),
    
    description: z
      .string()
      .max(200, "La descripción no debe superar los 200 caracteres.")
      .optional()
  });

  static validateAll(data: Partial<Role>) {
    return this.schema.safeParse(data);
  }

  static validateField<K extends keyof Role>(field: K, value: any) {
    const fieldSchema = this.schema.pick({ [field]: true } as any);
    return fieldSchema.safeParse({ [field]: value });
  }
}
