// src/validators/SessionValidator.ts

import { z } from "zod";
import { Session } from "@/models/Session";

export class SessionValidator {
  private static schema = z.object({
    id: z.string().uuid("El ID de la sesión debe ser un UUID válido.").optional(),

    token: z.string().min(10, "El token debe tener al menos 10 caracteres."),

    expiration: z
      .preprocess((val) => (typeof val === "string" ? new Date(val) : val), z.date({
        required_error: "La fecha de expiración es obligatoria.",
        invalid_type_error: "La fecha de expiración no es válida."
      })),

    FACode: z.string().length(6, "El código de autenticación debe tener 6 caracteres.").optional(),

    state: z.enum(["active", "expired", "revoked"]).optional()
  });

  static validateAll(data: Partial<Session>) {
    return this.schema.safeParse(data);
  }

  static validateField<K extends keyof Session>(field: K, value: any) {
    const fieldSchema = this.schema.pick({ [field]: true } as any);
    return fieldSchema.safeParse({ [field]: value });
  }
}
