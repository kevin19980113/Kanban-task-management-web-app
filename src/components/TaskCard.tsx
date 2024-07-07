import { StatusState, Task } from "@/types/board";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { SubTaskCheckbox } from "./SubTaskCheckBox";
import StatusSelect from "./StatusSelect";
import EditDeleteDropdown from "./EditDeleteDropdown";
import { useShallow } from "zustand/react/shallow";
import { useBoardStore } from "@/hooks/use-board";

export default function TaskCard({
  task,
  status,
}: {
  task: Task;
  status: StatusState;
}) {
  const { boards, boardIndex, setStatusIndex } = useBoardStore(
    useShallow((state) => ({
      boards: state.boards,
      boardIndex: state.boardIndex,
      setStatusIndex: state.setStatusIndex,
    }))
  );

  const subTaskDoneCount = task.subTasks.filter(
    (subTask) => subTask.done
  ).length;

  const subTaskTotalCounts = task.subTasks.length;
  const currentStatusIndex = boards[boardIndex].statuses.findIndex(
    (s) => s.id === status.id
  );

  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="w-full"
        onClick={() => setStatusIndex(currentStatusIndex)}
      >
        <div
          className="bg-white dark:bg-dark-grey rounded-lg flex flex-col items-start gap-y-1 px-5 py-6 
        cursor-pointer shadow-xl group"
        >
          <p className="text-black dark:text-white font-semibold text-base group-hover:text-main-purple break-all">
            {task.title}
          </p>
          <span className="text-medium-grey text-xs font-medium">{`${subTaskDoneCount} out of ${subTaskTotalCounts} subTasks`}</span>
        </div>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="break-all leading-7 flex justify-between items-center">
            {task.title}
            <EditDeleteDropdown sort="Task" task={task} />
          </DialogTitle>
          <DialogDescription className="break-all leading-6">
            {task.description}
          </DialogDescription>
        </DialogHeader>

        <div className="w-full grid grid-cols-1 mt-3 gap-y-4">
          <div className="w-full grid grid-cols-1 gap-y-2">
            <Label>{`subTasks(${subTaskDoneCount} out of ${subTaskTotalCounts})`}</Label>
            {task.subTasks.map((subtask) => (
              <SubTaskCheckbox
                key={subtask.id}
                subTask={subtask}
                taskId={task.id}
              />
            ))}
          </div>

          <StatusSelect task={task} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
