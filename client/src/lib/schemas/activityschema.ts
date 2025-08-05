import {z} from "zod";

const requiredString = (fieldName: string) => z.string().min(2, {message: `El campo ${fieldName} es requerido.`})

export const activitySchema = z.object({
  //title: z.string().nonempty("Título requerido.").min(2, {message: "Debe tener mas de dos letras."})
  title: requiredString("Título"),
  description: requiredString("Descripción"),
  category: requiredString("Categoría"),
  city: requiredString("Ciudad"),
  venue: requiredString("Lugar"),
});

export type ActivitySchema = z.infer<typeof activitySchema>;