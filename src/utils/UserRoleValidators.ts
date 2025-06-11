// src/validators/UserRoleValidator.ts

import { z } from "zod";
import { UserRole } from "@/models/UserRole";

export class UserRoleValidator {
  private static schema = z.object({
    id: z.string().uuid("El ID debe ser un UUID válido.").optional(),

    startAt: z
      .preprocess((val) => (typeof val === "string" ? new Date(val) : val), z.date({
        required_error: "La fecha de inicio es obligatoria.",
        invalid_type_error: "La fecha de inicio no es válida."
      })),

    endAt: z
      .preprocess((val) => (typeof val === "string" ? new Date(val) : val), z.date({
        required_error: "La fecha de finalización es obligatoria.",
        invalid_type_error: "La fecha de finalización no es válida."
      })).refine((end, ctx) => {
        const start = ctx?.parent?.startAt;
        return !start || end >= start;
      }, {
        message: "La fecha de finalización no puede ser anterior a la de inicio.",
      }),

    user: z.any().optional(),  // se valida a nivel de integración
    role: z.any().optional(),  // se valida a nivel de integración
  });

  static validateAll(data: Partial<UserRole>) {
    return this.schema.safeParse(data);
  }

  static validateField<K extends keyof UserRole>(field: K, value: any) {
    const fieldSchema = this.schema.pick({ [field]: true } as any);
    return fieldSchema.safeParse({ [field]: value });
  }
}
