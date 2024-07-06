import { Button } from "./ui/button";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./ui/dropdown-menu";
import { useBoardStore } from "@/hooks/use-board";
import { AlertDialog, AlertDialogTrigger } from "./ui/alert-dialog";
import { useShallow } from "zustand/react/shallow";
import DeleteDialog from "./DeleteDialog";
import { Task } from "@/types/board";
import EditDialog from "./EditDialog";

export default function EditDeleteDropdown({
  sort,
  task,
}: {
  sort: "Board" | "Task";
  task?: Task;
}) {
  const { boards, boardIndex } = useBoardStore(
    useShallow((state) => ({
      boards: state.boards,
      boardIndex: state.boardIndex,
    }))
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <AlertDialog>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="font-xs flex items-center gap-x-1 group"
            >
              <EllipsisVertical className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="max-w-[280px] bg-white dark:bg-dark-grey border-none py-2 px-0 shadow-2xl dark:shadow-indigo-500/50"
            side="top"
            sideOffset={30}
            align="start"
          >
            <div className="w-full flex flex-col items-start gap-y-2 px-4">
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:bg-red-200 hover:text-destructive dark:text-destructive dark:hover:bg-red-200 dark:hover:text-destructive
                  justify-start w-full"
                  onClick={() => closeDropdown()}
                >
                  {`Delete ${sort}`}
                </Button>
              </AlertDialogTrigger>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => closeDropdown()}
                >
                  {`Edit ${sort}`}
                </Button>
              </DialogTrigger>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <DeleteDialog
          sort={sort}
          description={`Are you sure you want to delete the '${
            sort === "Board"
              ? boards[boardIndex] && boards[boardIndex].title
              : task?.title
          }' ${sort}? This action will remove all columns and tasks and can not be reversed.`}
          task={task}
        />
        <EditDialog sort={sort} handleDialogClose={closeDialog} task={task} />
      </Dialog>
    </AlertDialog>
  );
}
