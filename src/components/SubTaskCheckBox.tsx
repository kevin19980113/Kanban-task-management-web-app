import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "./ui/label";
import { SubTask } from "@/types/board";
import { useBoardStore } from "@/hooks/use-board";
import { useShallow } from "zustand/react/shallow";
import { cn } from "@/lib/utils";

export function SubTaskCheckbox({
  subTask,
  taskId,
}: {
  subTask: SubTask;
  taskId: string;
}) {
  const { boardIndex, subTaskToggle, statusIndex } = useBoardStore(
    useShallow((state) => ({
      boardIndex: state.boardIndex,
      subTaskToggle: state.subTaskToggle,
      statusIndex: state.statusIndex,
    }))
  );

  const onCheckedChange = () => {
    subTaskToggle(taskId, subTask.id, boardIndex, statusIndex);
  };

  return (
    <div
      className="flex items-center space-x-2 p-4 bg-light-grey hover:bg-main-purple/30 
      dark:bg-very-dark-grey dark:hover:bg-main-purple/50 rounded-md cursor-pointer"
      onClick={() => onCheckedChange()}
    >
      <Checkbox
        id={subTask.id}
        checked={subTask.done}
        onCheckedChange={onCheckedChange}
        onClick={() => onCheckedChange()}
      />
      <Label
        htmlFor={subTask.title}
        className={cn("text-black break-all cursor-pointer", {
          "line-through text-medium-grey/70 dark:text-medium-grey":
            subTask.done,
        })}
      >
        {subTask.title}
      </Label>
    </div>
  );
}
