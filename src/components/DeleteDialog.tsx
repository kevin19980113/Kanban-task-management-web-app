import { useBoardStore } from "@/hooks/use-board";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useShallow } from "zustand/react/shallow";
import { Task } from "@/types/board";

type DeleteDialogProps = {
  sort: "Board" | "Task";
  description: string;
  task?: Task;
};

export default function DeleteDialog({
  sort,
  description,
  task,
}: DeleteDialogProps) {
  const {
    boards,
    boardIndex,
    statusIndex,
    setBoardIndex,
    deleteBoard,
    deleteTask,
  } = useBoardStore(
    useShallow((state) => ({
      boards: state.boards,
      boardIndex: state.boardIndex,
      statusIndex: state.statusIndex,
      setBoardIndex: state.setBoardIndex,
      deleteBoard: state.deleteBoard,
      deleteTask: state.deleteTask,
    }))
  );
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{`Delete This ${sort}?`}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction
          className="rounded-full"
          onClick={() => {
            switch (sort) {
              case "Board":
                deleteBoard(boards[boardIndex].id);
                setBoardIndex(-1);
                break;
              case "Task":
                if (task) {
                  deleteTask(task?.id, boardIndex, statusIndex);
                }
                break;
            }
          }}
        >
          Delete
        </AlertDialogAction>

        <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
