import { useBoardStore } from "@/hooks/use-board";
import MobileBoardDropDown from "./MobileBoardDropDown";
import { useShallow } from "zustand/react/shallow";
import AddNewTaskDialog from "./AddNewTaskDialog";
import EditDeleteDropdown from "./EditDeleteDropdown";

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
      <div className="w-full flex items-center justify-between gap-x-2">
        <div className="flex flex-auto overflow-hidden items-center gap-x-3">
          {!isSidebarVisible && (
            <div className="flex-shrink-0 items-center gap-x-2 hidden md:flex">
              <div className="size-4 md:w-36 md:size-10 bg-logo-mobile md:bg-logo-dark md:dark:bg-logo-light bg-contain bg-no-repeat bg-center"></div>
              <div className="bg-medium-grey w-px h-10 md:h-14"></div>
            </div>
          )}

          <MobileBoardDropDown />

          <div className="font-sm font-bold hidden md:block ml-2 line-clamp-1">
            {boards[boardIndex]
              ? boards[boardIndex].title
              : "Please Create a Board"}
          </div>
        </div>

        <div className="flex flex-shrink-0 items-center gap-x-2 w-auto w-min-0">
          {boardIndex >= 0 && boards[boardIndex].statuses.length > 0 && (
            <AddNewTaskDialog />
          )}

          {boardIndex >= 0 && <EditDeleteDropdown sort="Board" />}
        </div>
      </div>
    </header>
  );
}
