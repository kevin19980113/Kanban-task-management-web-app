import { useBoardStore } from "@/hooks/use-board";
import { useShallow } from "zustand/react/shallow";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";
import { Control, Controller } from "react-hook-form";
import { TaskSchemaType } from "@/lib/schema";
import { Task } from "@/types/board";

export default function StatusSelect({
  isError,
  control,
  task,
}: {
  isError?: boolean;
  control?: Control<TaskSchemaType>;
  task?: Task;
}) {
  const { boards, boardIndex, changeStatus, statusIndex } = useBoardStore(
    useShallow((state) => ({
      boards: state.boards,
      boardIndex: state.boardIndex,
      changeStatus: state.changeStatus,
      statusIndex: state.statusIndex,
    }))
  );

  const handleStatusChange = (newStatusTitle: string) => {
    if (task) {
      const newStatus = boards[boardIndex].statuses.find(
        (status) => status.title === newStatusTitle
      );
      if (newStatus) {
        changeStatus(task, newStatus.id, boardIndex);
      }
    }
  };

  if (control) {
    return (
      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <Label htmlFor="status">Status</Label>
            <SelectTrigger
              className={cn("text-xs md:text-sm", {
                "border-red-500 focus-visible:ring-red-500": isError,
              })}
            >
              <SelectValue placeholder="Select a Status" />
            </SelectTrigger>
            <SelectContent>
              {boards[boardIndex].statuses.map((status) => (
                <SelectItem key={status.id} value={status.title}>
                  {status.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    );
  }

  const currentStatusTitle = boards[boardIndex].statuses[statusIndex].title;

  return (
    <Select onValueChange={handleStatusChange} value={currentStatusTitle}>
      <Label htmlFor="status">Status</Label>
      <SelectTrigger
        className={cn("text-xs md:text-sm", {
          "border-red-500 focus-visible:ring-red-500": isError,
        })}
      >
        <SelectValue placeholder="Select a Status" />
      </SelectTrigger>
      <SelectContent>
        {boards[boardIndex].statuses.map((status) => (
          <SelectItem key={status.id} value={status.title}>
            {status.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
