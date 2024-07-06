import { z } from "zod";

const columnSchema = z.object({
  column: z.string().min(1, "Column is required"),
});

const subTaskSchema = z.object({
  subTask: z.string().min(1, "Subtask is required"),
});

export const BoardSchema = z.object({
  boardName: z
    .string()
    .min(1, {
      message: "Board name is required",
    })
    .max(30, {
      message: "Board name must be less than 30 characters",
    }),
  columns: z.array(columnSchema).min(1, {
    message: "At least one column is required",
  }),
});

export const TaskSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Task title is required",
    })
    .max(100, {
      message: "Task title must be less than 50 characters",
    }),
  description: z
    .string()
    .min(1, {
      message: "Task description is required",
    })
    .max(1000, {
      message: "Task description must be less than 1000 characters",
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
