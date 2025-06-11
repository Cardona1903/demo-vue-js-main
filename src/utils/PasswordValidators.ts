// src/validators/PasswordValidator.ts

import { z } from "zod";
import { Password } from "@/models/Password";

export class PasswordValidator {
  private static schema = z.object({
    content: z.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres.")
      .max(100, "La contraseña no debe exceder los 100 caracteres."),

    startAt: z.coerce.date({
      invalid_type_error: "La fecha de inicio no es válida."
    }),

    endAt: z.coerce.date({
      invalid_type_error: "La fecha de finalización no es válida."
    }).refine((end, ctx) => {
      const { startAt } = ctx.parent;
      return !startAt || end > startAt;
    }, {
      message: "La fecha de finalización debe ser posterior a la fecha de inicio."
    })
  });

  static validateAll(data: Partial<Password>) {
    return this.schema.safeParse(data);
  }

  static validateField<K extends keyof Password>(field: K, value: any) {
    const fieldSchema = this.schema.pick({ [field]: true } as any);
    return fieldSchema.safeParse({ [field]: value });
  }
}
