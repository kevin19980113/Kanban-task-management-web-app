import { z } from "zod";

export const ColumnSchema = z.object({
  column: z
    .string()
    .min(1, "Column is required")
    .refine((value) => value.trim().length > 0, {
      message: "Column cannot be only whitespace",
    }),
});

export const ColumnArraySchema = z.object({
  title: z.string().refine((value) => value.trim().length > 0, {
    message: "Column cannot be only whitespace",
  }),
});

const subTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Subtask is required")
    .refine((value) => value.trim().length > 0, {
      message: "Status cannot be only whitespace",
    }),
});

export const BoardSchema = z.object({
  boardName: z
    .string()
    .min(1, {
      message: "Board name is required",
    })
    .max(30, {
      message: "Board name must be less than 30 characters",
    })
    .refine((value) => value.trim().length > 0, {
      message: "Board name cannot be only whitespace",
    }),
  columns: z.array(ColumnArraySchema),
});

export const TaskSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Task title is required",
    })
    .max(100, {
      message: "Task title must be less than 50 characters",
    })
    .refine((value) => value.trim().length > 0, {
      message: "Task title cannot be only whitespace",
    }),
  description: z
    .string()
    .min(1, {
      message: "Task description is required",
    })
    .max(1000, {
      message: "Task description must be less than 1000 characters",
    })
    .refine((value) => value.trim().length > 0, {
      message: "Task description cannot be only whitespace",
    }),
  subTasks: z.array(subTaskSchema).min(1, {
    message: "At least one subtask is required",
  }),
  status: z.string().min(1, {
    message: "Status is required, please select a status",
  }),
});

export type BoardSchemaType = z.infer<typeof BoardSchema>;
export type TaskSchemaType = z.infer<typeof TaskSchema>;
export type ColumnSchemaType = z.infer<typeof ColumnSchema>;
