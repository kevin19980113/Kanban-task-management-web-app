import { Task } from "@/types/board";
import AddOrEditTaskForm from "./AddOrEditTaskFrom";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import AddOrEditBoardForm from "./AddOrEditBoardForm";
import { useBoardStore } from "@/hooks/use-board";
import { useShallow } from "zustand/react/shallow";

export default function EditDialog({
  sort,
  handleDialogClose,
  task,
}: {
  sort: "Board" | "Task";
  handleDialogClose: () => void;
  task?: Task;
}) {
  const { boards, boardIndex } = useBoardStore(
    useShallow((state) => ({
      boards: state.boards,
      boardIndex: state.boardIndex,
    }))
  );

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
        <AddOrEditBoardForm
          onClose={handleDialogClose}
          action="Edit"
          board={boards[boardIndex]}
        />
      )}
    </DialogContent>
  );
}
