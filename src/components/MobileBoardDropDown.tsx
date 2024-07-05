import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Dialog } from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./ui/dropdown-menu";

import BoarderList from "./BoarderList";
import ThemeSwitch from "./ThemeSwitch";
import AddNewBoardDialog from "./AddNewBoardDialog";
import { useBoardStore } from "@/hooks/use-board";
import { useShallow } from "zustand/react/shallow";

export default function MobileBoardDropDown() {
  const { boardIndex, boards } = useBoardStore(
    useShallow((state) => ({
      boards: state.boards,
      boardIndex: state.boardIndex,
    }))
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            className="font-xs flex items-center gap-x-1 group"
          >
            {boards[boardIndex] ? boards[boardIndex].title : "CREATE BOARD"}
            <ChevronDown
              className={`size-4 text-main-purple group-hover:text-white transition-all ${
                isDropdownOpen ? "-rotate-180" : "rotate-0"
              }`}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="max-w-[280px] bg-white dark:bg-dark-grey border-none py-2 px-0 shadow-2xl dark:shadow-indigo-500/50"
          side="top"
          sideOffset={30}
          align="start"
        >
          <BoarderList handleClose={handleDropdownClose} />
          <div className="px-4 mb-4 mt-6">
            <ThemeSwitch />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <AddNewBoardDialog handleClose={handleDialogClose} />
    </Dialog>
  );
}
