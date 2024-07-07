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
    <>
      <div className="flex-shrink-0 flex items-center md:hidden">
        <div className="size-4 md:w-36 md:size-10 bg-logo-mobile md:bg-logo-dark md:dark:bg-logo-light bg-contain bg-no-repeat bg-center"></div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
          <DropdownMenuTrigger
            asChild
            className="md:hidden flex-shrink min-w-0 max-w-max"
          >
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center justify-start gap-x-1 group flex-grow "
            >
              <span className="overflow-hidden text-ellipsis font-bold">
                {boards[boardIndex] ? boards[boardIndex].title : "CREATE BOARD"}
              </span>

              <ChevronDown
                className={`size-4 flex-shrink-0 text-main-purple transition-all ${
                  isDropdownOpen ? "-rotate-180" : "rotate-0"
                }`}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="md:hidden max-w-[280px] bg-white dark:bg-dark-grey border-none py-2 px-0 shadow-2xl dark:shadow-indigo-500/50"
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
    </>
  );
}
