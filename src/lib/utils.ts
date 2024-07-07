import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Board } from "@/types/board";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type TitleType = "Board" | "Status" | "Task";
export function isTitleDuplicate(
  title: string,
  type: TitleType,
  boards: Board[],
  currentBoardIndex?: number,
  currentStatusIndex?: number
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

    case "Task":
      if (currentBoardIndex === undefined || currentStatusIndex === undefined) {
        throw new Error(
          "currentBoardIndex and currentStatusIndex are required for task title check"
        );
      }

      return boards[currentBoardIndex].statuses.some((status) =>
        status.tasks.some((task) => task.title === title)
      );
  }
}

export const defaultColors = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#607d8b",
];

export const defaultColor = defaultColors[3];
