import { useBoardStore } from "@/hooks/use-board";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import { useShallow } from "zustand/react/shallow";
import { Plus } from "lucide-react";

export default function BoarderList({
  handleClose,
}: {
  handleClose?: () => void;
}) {
  const { boards, totalBoards, boardIndex, setBoardIndex } = useBoardStore(
    useShallow((state) => ({
      boards: state.boards,
      totalBoards: state.totalBoards,
      boardIndex: state.boardIndex,
      setBoardIndex: state.setBoardIndex,
    }))
  );

  const boardButtonStyles =
    "w-full flex gap-x-2 items-center justify-start rounded-r-full py-3 px-4 flex-shrink-0 group";

  return (
    <div className="flex flex-col items-start pr-8 w-[250px] xl:w-[300px]">
      <div className="text-xs text-medium-grey font-medium px-4 py-2 text-left tracking-wider">
        ALL BOARD ({totalBoards})
      </div>
      <div className="w-full flex flex-col items-start text-left text-medium-grey font-medium pr-10 overflow-y-scroll max-h-[300px]">
        {boards.map((board, index) => (
          <Button
            className={`${boardButtonStyles} ${
              boardIndex === index ? "bg-main-purple text-white" : ""
            }`}
            variant="ghost"
            key={board.title}
            onClick={() => {
              setBoardIndex(index);
              handleClose && handleClose();
            }}
          >
            <svg
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              className={`size-4 fill-main-purple group-hover:fill-main-purple flex-shrink-0 ${
                boardIndex === index ? "fill-white" : ""
              }`}
            >
              <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
            </svg>
            <span className="inline-block truncate">{board.title}</span>
          </Button>
        ))}
      </div>
      <DialogTrigger className="mt-4" asChild>
        <Button
          variant="ghost"
          className={`text-main-purple ${boardButtonStyles}`}
        >
          <svg
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            className="size-4 fill-main-purple"
          >
            <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
          </svg>
          <div className="flex items-center gap-x-1 ml-2">
            <Plus className="size-4 text-main-purple" />
            Create New Board
          </div>
        </Button>
      </DialogTrigger>
    </div>
  );
}
