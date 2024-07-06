import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Board } from "@/types/board";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type TitleType = "Board" | "Status";
export function isTitleDuplicate(
  title: string,
  type: TitleType,
  boards: Board[],
  currentBoardIndex?: number
): boolean {
  switch (type) {
    case "Board":
      return boards.find((board) => board.title === title) !== undefined;

    case "Status":
      if (currentBoardIndex === undefined) {
        throw new Error("currentBoardIndex is required for status title check");
      }
      return (
        boards[currentBoardIndex].statuses.find(
          (status) => status.title === title
        ) !== undefined
      );
  }
}
