import { Fragment } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { X } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import {
  FieldErrors,
  UseFormRegister,
  useFieldArray,
  Control,
  ArrayPath,
  Path,
} from "react-hook-form";
import { BoardSchemaType, TaskSchemaType } from "@/lib/schema";
import { cn, defaultColor } from "@/lib/utils";
import ColorPicker from "./ColorPicker";

type InputProps<T extends BoardSchemaType | TaskSchemaType> = {
  control: Control<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  fieldName: T extends BoardSchemaType ? "columns" : "subTasks";
  label: string;
  placeholder: string;
  action: "Add" | "Edit" | "Task";
  selectedColors: string[];
  onColorChange: (color: string, index: number) => void;
};

export default function DynamicInput<
  T extends BoardSchemaType | TaskSchemaType
>({
  control,
  register,
  errors,
  fieldName,
  label,
  placeholder,
  action,
  selectedColors,
  onColorChange,
}: InputProps<T>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName as ArrayPath<T>,
    rules: { minLength: 1 },
  });

  const getInputName = (index: number): Path<T> => {
    return `${fieldName}.${index}.${
      fieldName === "columns" ? "column" : "subTask"
    }` as Path<T>;
  };

  const hasErrorAtIndex = (index: number): boolean => {
    const fieldErrors = errors[fieldName] as
      | { [key: number]: { [key: string]: { message?: string } } }
      | undefined;
    const subFieldName = fieldName === "columns" ? "column" : "subTask";
    return !!(fieldErrors && fieldErrors[index]?.[subFieldName]?.message);
  };
  return (
    <ScrollArea className="max-h-[250px]">
      <div className="w-full grid grid-cols-1 items-left gap-y-3">
        <Label htmlFor={fieldName}>{label}</Label>
        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <div className="flex items-center gap-x-2 px-1">
              <Input
                {...register(getInputName(index))}
                className={cn({
                  "border-red-500 focus-visible:ring-red-500":
                    hasErrorAtIndex(index),
                })}
                placeholder={placeholder}
              />
              {action !== "Task" && (
                <ColorPicker
                  index={index}
                  action={action}
                  onColorChange={(color) => onColorChange(color, index)}
                  initialColor={selectedColors[index] || defaultColor}
                />
              )}
              <X
                className="size-5 text-medium-grey hover:text-main-purple hover:scale-105 cursor-pointer"
                onClick={() => remove(index)}
              />
            </div>
            {hasErrorAtIndex(index) && (
              <p className="text-red-500 text-xs md:text-sm">
                {
                  (errors[fieldName] as any)?.[index]?.[
                    fieldName === "columns" ? "column" : "subTask"
                  ]?.message
                }
              </p>
            )}
          </Fragment>
        ))}

        {errors[fieldName as keyof typeof errors] &&
          "root" in (errors[fieldName as keyof typeof errors] || {}) && (
            <p className="text-red-500 text-xs md:text-sm">
              {
                (
                  (errors[fieldName as keyof typeof errors] as any)?.root as {
                    message?: string;
                  }
                )?.message
              }
            </p>
          )}

        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            append(
              fieldName === "columns"
                ? { column: "" }
                : ({ subTask: "" } as any)
            )
          }
        >
          + Add New {fieldName === "columns" ? "Column" : "Subtask"}
        </Button>
      </div>
    </ScrollArea>
  );
}
