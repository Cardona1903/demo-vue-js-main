// src/validators/ProfileValidator.ts

import { z } from "zod";
import { Profile } from "@/models/Profile";

export class ProfileValidator {
  private static schema = z.object({
    phone: z
      .string()
      .regex(/^\d{10}$/, "El número de teléfono debe tener exactamente 10 dígitos.")
      .optional(),

    photo: z
      .string()
      .url("La URL de la foto no es válida.")
      .optional()
  });

  static validateAll(data: Partial<Profile>) {
    return this.schema.safeParse(data);
  }

  static validateField<K extends keyof Profile>(field: K, value: any) {
    const fieldSchema = this.schema.pick({ [field]: true } as any);
    return fieldSchema.safeParse({ [field]: value });
  }
}
    