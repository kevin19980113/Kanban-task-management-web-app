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
} from "react-hook-form";
import { BoardSchemaType } from "@/lib/schema";
import { cn } from "@/lib/utils";

export default function ColumnsInput({
  control,
  register,
  errors,
}: {
  control: Control<BoardSchemaType>;
  register: UseFormRegister<BoardSchemaType>;
  errors: FieldErrors<BoardSchemaType>;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
    rules: { minLength: 1 },
  });

  return (
    <ScrollArea className="max-h-[250px]">
      <div className="w-full grid grid-cols-1 items-left gap-y-3">
        <Label
          htmlFor="columns"
          className="text-xs md:text-sm text-medium-grey"
        >
          Board Columns
        </Label>
        {fields.map((field, index) => (
          <Fragment key={field.id}>
            <div className="flex items-center gap-x-2 px-1">
              <Input
                {...register(`columns.${index}.column`)}
                className={cn("text-xs md:text-sm", {
                  "border-red-500 focus-visible:ring-red-500":
                    errors.columns && errors.columns[index]?.column,
                })}
                placeholder="e.g Design"
              />
              <X
                className="size-5 text-medium-grey hover:text-main-purple hover:scale-105 cursor-pointer"
                onClick={() => remove(index)}
              />
            </div>
            {errors.columns?.[index]?.column && (
              <p className="text-red-500 text-xs md:text-sm">
                {errors.columns[index]?.column?.message}
              </p>
            )}
          </Fragment>
        ))}

        {errors.columns?.root && (
          <p className="text-red-500 text-xs md:text-sm">
            {errors.columns.root.message}
          </p>
        )}

        <Button
          type="button"
          variant="secondary"
          className="text-xs md:text-sm"
          onClick={() => append({ column: "" })}
        >
          + Add New Column
        </Button>
      </div>
    </ScrollArea>
  );
}
