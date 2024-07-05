import { useBoardStore } from "@/hooks/use-board";
import MobileBoardDropDown from "./MobileBoardDropDown";
import { Button } from "./ui/button";
import { useShallow } from "zustand/react/shallow";
import BoardDropdown from "./BoardDropdown";

export default function Header({
  isSidebarVisible,
}: {
  isSidebarVisible: boolean;
}) {
  const { boardIndex, boards } = useBoardStore(
    useShallow((state) => ({
      boards: state.boards,
      boardIndex: state.boardIndex,
    }))
  );

  return (
    <header className="w-full h-20 flex items-center bg-white dark:bg-dark-grey px-4 border-b border-light-grey dark:border-lines-dark">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          {!isSidebarVisible && (
            <>
              <div className="size-4 md:w-36 md:size-10 bg-logo-mobile md:bg-logo-dark md:dark:bg-logo-light bg-contain bg-no-repeat bg-center"></div>
              <div className="bg-medium-grey w-px h-10 md:h-14"></div>
            </>
          )}
          <MobileBoardDropDown />
          <div className="font-sm font-bold hidden md:block ml-2">
            {boards[boardIndex] ? boards[boardIndex].title : "CREATE BOARD"}
          </div>
        </div>

        <div className="flex items-center gap-x-2">
          <Button className="rounded-full px-4 py-[4px] md:py-3 text-xl md:text-sm lg:text-base">
            <span className="md:hidden">+</span>
            <span className="hidden md:inline">+ Add New Task</span>
          </Button>

          <BoardDropdown />
        </div>
      </div>
    </header>
  );
}
