// src/validators/RolePermissionValidator.ts

import { z } from "zod";
import { RolePermission } from "@/models/RolePermission";

export class RolePermissionValidator {
  private static schema = z.object({
    id: z.string().uuid("ID inválido.").optional(),

    startAt: z
      .preprocess((val) => (typeof val === "string" ? new Date(val) : val), z.date({
        required_error: "La fecha de inicio es requerida.",
        invalid_type_error: "La fecha de inicio no es válida."
      })),

    endAt: z
      .preprocess((val) => (typeof val === "string" ? new Date(val) : val), z.date({
        required_error: "La fecha de finalización es requerida.",
        invalid_type_error: "La fecha de finalización no es válida."
      }))
      .refine((endAt, ctx) => {
        const startAt = ctx.parent.startAt as Date;
        return !startAt || !endAt || endAt > startAt;
      }, { message: "La fecha de finalización debe ser posterior a la de inicio." })
  });

  static validateAll(data: Partial<RolePermission>) {
    return this.schema.safeParse(data);
  }

  static validateField<K extends keyof RolePermission>(field: K, value: any) {
    const fieldSchema = this.schema.pick({ [field]: true } as any);
    return fieldSchema.safeParse({ [field]: value });
  }
}
