// src/validators/AddressValidator.ts

import { z } from "zod";
import { Address } from "@/models/Address";

export class AddressValidator {
  private static schema = z.object({
    street: z.string()
      .min(3, "La calle debe tener al menos 3 caracteres.")
      .max(100, "La calle no debe superar los 100 caracteres."),
      
    number: z.string()
      .min(1, "El número es obligatorio.")
      .max(10, "El número no debe superar los 10 caracteres."),
      
    latitude: z.number()
      .min(-90, "La latitud debe estar entre -90 y 90.")
      .max(90, "La latitud debe estar entre -90 y 90.")
      .optional(),

    longitude: z.number()
      .min(-180, "La longitud debe estar entre -180 y 180.")
      .max(180, "La longitud debe estar entre -180 y 180.")
      .optional()
  });

  static validateAll(data: Partial<Address>) {
    return this.schema.safeParse(data);
  }

  static validateField<K extends keyof Address>(field: K, value: any) {
    const fieldSchema = this.schema.pick({ [field]: true } as any);
    return fieldSchema.safeParse({ [field]: value });
  }
}
