import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { ColumnSchema, ColumnSchemaType } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn, isTitleDuplicate } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";
import { useShallow } from "zustand/react/shallow";
import { useBoardStore } from "@/hooks/use-board";
import { toast } from "sonner";

export default function AddNewColumnDialog({
  sort,
}: {
  sort: "IN MAIN BOARD" | "IN COLUMN";
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { boards, addStatus, boardIndex } = useBoardStore(
    useShallow((state) => ({
      boards: state.boards,
      addStatus: state.addStatus,
      boardIndex: state.boardIndex,
    }))
  );
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ColumnSchemaType>({
    resolver: zodResolver(ColumnSchema),
    defaultValues: {
      column: "",
    },
  });

  const handleAddColumn = (formData: ColumnSchemaType) => {
    if (isTitleDuplicate(formData.column, "Status", boards, boardIndex)) {
      toast.warning(`Column name '${formData.column}' already exists!`);
      return;
    }
    const newStatus = {
      id: uuidv4(),
      title: formData.column,
      tasks: [],
      totalTasks: 0,
    };
    addStatus(newStatus, boardIndex);
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (!isDialogOpen) {
      reset();
    }
  }, [isDialogOpen, reset]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {sort === "IN COLUMN" ? (
          <div
            className="bg-medium-grey/20 dark:bg-medium-grey/10 rounded-2xl flex items-center justify-center group cursor-pointer
        hover:bg-medium-grey/30 dark:hover:bg-medium-grey/20"
          >
            <span className="text-base md:text-lg text-medium-grey font-semibold group-hover:text-main-purple">
              + New Column
            </span>
          </div>
        ) : (
          <Button>+ Add New Column</Button>
        )}
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Add New Column</DialogTitle>
        </DialogHeader>

        <form
          className="w-full grid grid-cols-1 gap-y-8"
          onSubmit={handleSubmit(handleAddColumn)}
        >
          <div className="flex flex-col items-start gap-y-2">
            <Label htmlFor="title">title</Label>
            <Input
              {...register("column")}
              className={cn({
                "border-red-500 focus-visible:ring-red-500": errors.column,
              })}
            />
            {errors.column && (
              <p className="text-red-500 text-xs md:text-sm">
                {errors.column.message}
              </p>
            )}
          </div>

          <Button type="submit">Create Column (Status)</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
