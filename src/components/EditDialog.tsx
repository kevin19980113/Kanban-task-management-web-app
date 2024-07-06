import { Task } from "@/types/board";
import AddNewBoardForm from "./AddNewBoardForm";
import AddOrEditTaskForm from "./AddOrEditTaskFrom";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

export default function EditDialog({
  sort,
  handleDialogClose,
  task,
}: {
  sort: "Board" | "Task";
  handleDialogClose: () => void;
  task?: Task;
}) {
  return (
    <DialogContent aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle>{`Edit ${sort}`}</DialogTitle>
      </DialogHeader>

      {sort === "Task" ? (
        <AddOrEditTaskForm
          onClose={handleDialogClose}
          action="Edit"
          task={task}
        />
      ) : (
        <AddNewBoardForm onClose={handleDialogClose} />
      )}
    </DialogContent>
  );
}
