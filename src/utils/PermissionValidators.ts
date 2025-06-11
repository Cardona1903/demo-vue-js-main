// src/validators/PermissionValidator.ts

import { z } from "zod";
import { Permission } from "@/models/Permission";

export class PermissionValidator {
  private static schema = z.object({
    url: z.string()
      .min(1, "La URL es obligatoria.")
      .url("Debe ser una URL válida."),

    method: z.string()
      .toUpperCase()
      .refine(method =>
        ["GET", "POST", "PUT", "DELETE", "PATCH"].includes(method),
        { message: "Método HTTP no válido." }),

    entity: z.string()
      .min(1, "La entidad es obligatoria.")
      .max(50, "El nombre de la entidad no debe exceder 50 caracteres.")
  });

  static validateAll(data: Partial<Permission>) {
    return this.schema.safeParse(data);
  }

  static validateField<K extends keyof Permission>(field: K, value: any) {
    const fieldSchema = this.schema.pick({ [field]: true } as any);
    return fieldSchema.safeParse({ [field]: value });
  }
}
