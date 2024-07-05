import { z } from "zod";

const columnSchema = z.object({
  column: z.string().min(1, "Column is required"),
});

export const BoardSchema = z.object({
  boardName: z
    .string()
    .min(1, {
      message: "Board name is required",
    })
    .max(20, {
      message: "Board name must be less than 20 characters",
    }),
  columns: z.array(columnSchema).min(1, {
    message: "At least one column is required",
  }),
});

export type BoardSchemaType = z.infer<typeof BoardSchema>;
