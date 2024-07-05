import { Button } from "./ui/button";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { Dialog } from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./ui/dropdown-menu";
import AddNewBoardDialog from "./AddNewBoardDialog";
import { useBoardStore } from "@/hooks/use-board";
import { AlertDialog, AlertDialogTrigger } from "./ui/alert-dialog";
import { useShallow } from "zustand/react/shallow";
import BoarderList from "./BoarderList";
import DeleteBoardDialog from "./DeleteBoardDialog";

export default function MobileBoardDropDown() {
  // const { boardIndex, boards } = useBoardStore(
  //   useShallow((state) => ({
  //     boards: state.boards,
  //     boardIndex: state.boardIndex,
  //   }))
  // );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
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
            <div className="w-full flex flex-col items-center gap-y-2">
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-destructive">
                  Delete Board
                </Button>
              </AlertDialogTrigger>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <DeleteBoardDialog
          sort="board"
          description="Are you sure you want to delete this board?"
        />
      </Dialog>
    </AlertDialog>
  );
}
