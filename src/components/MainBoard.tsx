import { useShallow } from "zustand/react/shallow";
import { Button } from "./ui/button";
import { useBoardStore } from "@/hooks/use-board";
import StatusesGrid from "./StatusesGrid";

export default function MainBoard() {
  const { boards, boardIndex } = useBoardStore(
    useShallow((state) => ({
      boards: state.boards,
      boardIndex: state.boardIndex,
    }))
  );

  return (
    <div className="w-full flex flex-col flex-grow items-center justify-center bg-light-grey dark:bg-very-dark-grey">
      {boards[boardIndex] && boards[boardIndex].statuses.length === 0 && (
        <div className="w-full flex-grow my-auto flex flex-col items-center justify-center gap-y-6 relative">
          <div className="text-sm lg:text-base text-medium-grey font-medium px-8 text-center">
            This board is empty, Create a new column to get started.
          </div>
          <Button>+ Add New Column</Button>
        </div>
      )}

      {boards[boardIndex] && <StatusesGrid />}
    </div>
  );
}
